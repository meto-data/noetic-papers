(function() {
  const EXCLUDED_FOLDERS = [
    "ekler", "görseller", "pdf", "pdfler", "images", "assets",
    "attachments", "media", "resimler", "dosyalar", "notlar"
  ]

  interface TreeNode {
    name: string
    slug: string
    isFolder: boolean
    children: TreeNode[]
    level: number
  }

  function shouldExcludeFolder(folderName: string): boolean {
    const lower = folderName.toLowerCase()
    // exact segment match only (avoid excluding e.g. 'profiles')
    return EXCLUDED_FOLDERS.some((excluded) => lower === excluded)
  }

  function shouldExcludeFile(fileName: string): boolean {
    const lower = fileName.toLowerCase()
    // Exclude index files and common system files
    return lower === 'index' ||
           lower.startsWith('index.') ||
           lower === 'readme' ||
           lower.startsWith('readme.') ||
           lower === '.DS_Store' ||
           lower.startsWith('.')
  }

  function countWords(text: string): number {
    if (!text) return 0
    // strip code blocks and markdown
    let cleaned = text.replace(/```[\s\S]*?```/g, " ")
    cleaned = cleaned.replace(/`[^`]+`/g, " ") // inline code
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    cleaned = cleaned.replace(/[#*_~`]/g, " ") // markdown symbols

    // Split by whitespace and filter empty strings
    const words = cleaned.split(/\s+/).filter(word => word.length > 0)

    // Count actual words (not just unicode letters)
    return words.length
  }

  async function buildTreeFromData(): Promise<{ root: TreeNode; altFiles: number; altWords: number; wordMap: Map<string, number>; allWordMap: Map<string, number> }> {
    const root: TreeNode = { name: "root", slug: "", isFolder: true, children: [], level: 0 }

    const data = await fetchData
    const allSlugs = Object.keys(data || {})
    console.log("[filetree] total slugs:", allSlugs.length)

    const pathMap = new Map<string, TreeNode>()
    pathMap.set("", root)

    let altFiles = 0
    let altWords = 0
    const wordMap = new Map<string, number>() // visible slug -> word count
    const allWordMap = new Map<string, number>() // all slugs (except index) -> word count

    for (const slug of allSlugs) {
      const file = data[slug]
      const parts = slug.split("/").filter((p) => p.length > 0)

      // Skip index files completely
      if (shouldExcludeFile(parts[parts.length - 1])) {
        continue
      }

      let currentPath = ""
      let currentNode: TreeNode | null = root
      let isExcluded = false

      // Calculate word count first
      let wordCount = 0
      if (file && typeof file.content === "string") {
        wordCount = countWords(file.content)
      } else if (file && typeof file.text === "string") {
        wordCount = countWords(file.text)
      }
      // track all files (even under excluded folders) for accurate percentages
      allWordMap.set(slug, wordCount)

      for (let i = 0; i < parts.length && currentNode; i++) {
        const part = parts[i]
        const isLastPart = i === parts.length - 1
        const newPath = currentPath ? `${currentPath}/${part}` : part

        if (!isLastPart && shouldExcludeFolder(part)) {
          // Count files under excluded folders as alt files
          altFiles += file ? 1 : 0
          altWords += wordCount
          isExcluded = true
          currentNode = null
          break
        }

        let childNode = pathMap.get(newPath)
        if (!childNode) {
          const isFolder = !isLastPart
          childNode = {
            name: part,
            slug: newPath,
            isFolder,
            children: [],
            level: i + 1,
          }
          pathMap.set(newPath, childNode)
          currentNode.children.push(childNode)
        }

        currentNode = childNode
        currentPath = newPath
      }

      // Add to visible wordMap only if not excluded
      if (!isExcluded) {
        wordMap.set(slug, wordCount)
      }
    }

    function sortTree(node: TreeNode) {
      node.children.sort((a, b) => {
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        return a.name.localeCompare(b.name)
      })
      node.children.forEach(sortTree)
    }

    sortTree(root)
    return { root, altFiles, altWords, wordMap, allWordMap }
  }

  function cleanDisplayName(name: string): string {
    // "8- Makale İnceleme ve Özet" formatına çevir
    // Önce tüm tireleri boşluk ile değiştir
    let cleanName = name.replace(/-/g, " ")

    // Eğer başında sayı-tire varsa, onu koru
    if (/^\d+-/.test(name)) {
      const match = name.match(/^(\d+)-/)
      if (match) {
        cleanName = match[1] + "- " + cleanName.substring(match[0].length)
      }
    }

    return cleanName
  }

  function renderTreeNode(node: TreeNode, isRoot = false, maxDepth = Infinity, wordMap?: Map<string, number>, totalWords?: number, showFiles: boolean = true, isDetailView: boolean = false): string {
    if (isRoot) {
      return node.children.map((child) => renderTreeNode(child, false, maxDepth, wordMap, totalWords, showFiles, isDetailView)).join("")
    }

    // In detail view, hide files unless showFiles is true
    if (isDetailView && !node.isFolder && !showFiles) {
      return ""
    }

    const indent = "&nbsp;&nbsp;".repeat(Math.max(0, node.level - 1))
    const icon = node.isFolder ? (isDetailView ? "📂" : "📁") : "📄"
    const prefix = node.level > 1 ? "├── " : ""
    const displayName = cleanDisplayName(node.name)

    let html = `<div class="tree-item ${node.isFolder ? "folder" : "file"}" data-level="${
      node.level
    }"${node.isFolder && isDetailView ? ` data-toggle-folder="true"` : ""}>${indent}${prefix}${icon} `

    if (node.isFolder) {
      html += `<span class="tree-folder-name">${displayName}</span>`
    } else {
      html += `<a href="/${node.slug}" class="tree-file-link">${displayName}</a>`
    }

    // Add word count for files and percentage for folders
    if (wordMap && totalWords && totalWords > 0) {
      if (node.isFolder) {
        // Calculate folder word count (sum of all children recursively)
        const folderWords = calculateFolderWords(node, wordMap)
        const pctNum = (folderWords / totalWords) * 100
        const percentage = (pctNum > 0 && pctNum < 0.01) ? '0,01' : pctNum.toFixed(2).replace('.', ',')
        html += ` <span class="word-count">(${folderWords.toLocaleString('tr-TR')} kelime - ${percentage}%)</span>`
      } else if (showFiles) {
        const fileWords = wordMap.get(node.slug) || 0
        const pctNumF = (fileWords / totalWords) * 100
        const percentage = (pctNumF > 0 && pctNumF < 0.01) ? '0,01' : pctNumF.toFixed(2).replace('.', ',')
        html += ` <span class="word-count">(${fileWords.toLocaleString('tr-TR')} kelime - ${percentage}%)</span>`
      }
    }

    html += `</div>`

    if (node.children.length > 0 && node.level < maxDepth) {
      const childMaxDepth = maxDepth
      if (isDetailView) {
        // GRAPH VIEW: Only folders, recursively
        const folderChildren = node.children
          .filter((c) => c.isFolder)
          .map((child) => renderTreeNode(child, false, childMaxDepth, wordMap, totalWords, false, true))
          .join("")
        if (folderChildren.trim()) {
          html += `<div class="folder-children">${folderChildren}</div>`
        }
      } else {
        // NORMAL VIEW: Render everything (folders + files)
        const allChildren = node.children
          .map((child) => renderTreeNode(child, false, childMaxDepth, wordMap, totalWords, true, false))
          .join("")
        if (allChildren.trim()) {
          html += allChildren
        }
      }
    }

    return html
  }

  function calculateFolderWords(node: TreeNode, wordMap: Map<string, number>): number {
    if (!node.isFolder) {
      return wordMap.get(node.slug) || 0
    }

    // Sum up all file words in this folder and subfolders
    function sumWords(n: TreeNode): number {
      let sum = 0
      if (!n.isFolder && wordMap.has(n.slug)) {
        sum += wordMap.get(n.slug) || 0
      }
      for (const child of n.children) {
        sum += sumWords(child)
      }
      return sum
    }

    return sumWords(node)
  }

  function calculateStats(node: TreeNode): { folders: number; files: number } {
    let folders = node.isFolder ? 1 : 0
    let files = node.isFolder ? 0 : 1

    for (const child of node.children) {
      const childStats = calculateStats(child)
      folders += childStats.folders
      files += childStats.files
    }

    return { folders, files }
  }

  document.addEventListener("nav", () => {
    const rootEl = document.querySelector(".file-tree") as HTMLElement | null
    if (!rootEl) return

    const outer = rootEl.querySelector(".file-tree-modal-outer") as HTMLElement
    const btn = rootEl.querySelector(".file-tree-button") as HTMLButtonElement
    const closeBtn = rootEl.querySelector(".file-tree-close") as HTMLButtonElement
    const content = rootEl.querySelector(".file-tree-content") as HTMLElement
    const statsFolder = rootEl.querySelector(".stats-folders") as HTMLElement
    const statsFiles = rootEl.querySelector(".stats-files") as HTMLElement
    const statsAlt = rootEl.querySelector(".stats-altfiles") as HTMLElement
    const graphBtn = rootEl.querySelector(".file-tree-graph") as HTMLButtonElement

    let cachedData: { root: TreeNode; altFiles: number; altWords: number; wordMap: Map<string, number>; allWordMap: Map<string, number> } | null = null

    const openModal = () => {
      outer.setAttribute("aria-hidden", "false")
      outer.classList.add("active")
    }
    const closeModal = () => {
      outer.setAttribute("aria-hidden", "true")
      outer.classList.remove("active")
    }

    const renderTreeView = () => {
      if (!cachedData) return
      content.innerHTML = `<div class="tree-view">${renderTreeNode(cachedData.root, true, Infinity, undefined, undefined, true, false)}</div>`
    }

    const renderDetailView = async () => {
      if (!cachedData) return

      // Calculate total words for percentage calculation (all files under tree, including hidden ones)
      const totalWords = Array.from(cachedData.allWordMap.values()).reduce((a, b) => a + b, 0)

      // Controls: depth range (1-10) and show files toggle
      const controls = `
        <div class="graph-controls">
          <label class="graph-depth-label">Derinlik:
            <input type="range" min="1" max="10" step="1" value="1" class="graph-depth" />
            <span class="graph-depth-value">1</span>
          </label>
        </div>`

      const depth = 1
      const treeHtml = renderTreeNode(cachedData.root, true, depth, cachedData.allWordMap, totalWords, false, true)

      content.innerHTML = `
        <div class="detail-view">
          ${controls}
          <div class="tree-view">${treeHtml}</div>
        </div>`
    }

    const onOpen = async () => {
      openModal()
      console.log("[filetree] opening modal…")

      try {
        cachedData = await buildTreeFromData()
        const stats = calculateStats(cachedData.root)

        // Calculate total words for included files only (not alt files)
        const includedWords = Array.from(cachedData.wordMap.values()).reduce((a, b) => a + b, 0)

        statsFolder.textContent = `${Math.max(0, stats.folders - 1)} klasör`
        statsFiles.textContent = `${stats.files} dosya`
        statsAlt.textContent = `${cachedData.altFiles} alt dosya (${includedWords.toLocaleString('tr-TR')} kelime)`
        outer.querySelector('.file-tree-modal')?.classList.remove('graph-mode')
        renderTreeView()
        console.log("[filetree] built:", { folders: stats.folders, files: stats.files, altFiles: cachedData.altFiles, includedWords })
      } catch (e) {
        console.error("[filetree] failed:", e)
        content.innerHTML = `<div class="tree-loading">Hata: ağacı oluşturamadım.</div>`
      }
    }

    // no depth control in UI anymore

    const onClose = () => closeModal()
    const onOutsideClick = (e: MouseEvent) => {
      if (e.target === outer) closeModal()
    }

    // Bind listeners with named functions so we can clean them up reliably
    const onGraphClick = async () => {
      if (!cachedData) {
        // open modal and load data if needed
        await onOpen()
      }
      const modal = rootEl.querySelector('.file-tree-modal') as HTMLElement
      const isActive = outer.classList.contains('active')
      if (!isActive) {
        openModal()
      }
      const isGraph = modal.classList.contains('graph-mode')
      if (isGraph) {
        modal.classList.remove('graph-mode')
        renderTreeView()
      } else {
        modal.classList.add('graph-mode')
        renderDetailView()
      }
    }

    const onInputDepth = (ev: Event) => {
      const target = ev.target as HTMLElement
      if (!(target instanceof HTMLInputElement)) return
      if (!target.classList.contains('graph-depth')) return
      const val = target.value
      const bubble = content.querySelector('.graph-depth-value') as HTMLElement | null
      if (bubble) bubble.textContent = val
    }

    const onChangeDepth = (ev: Event) => {
      const target = ev.target as HTMLElement
      if (!(target instanceof HTMLInputElement)) return
      if (!target.classList.contains('graph-depth')) return
      const depthEl = target
      if (!cachedData) return
      const totalWords = Array.from(cachedData.allWordMap.values()).reduce((a, b) => a + b, 0)
      const depth = Math.max(1, Math.min(10, parseInt(depthEl.value || '1', 10)))
      const html = renderTreeNode(cachedData.root, true, depth, cachedData.allWordMap, totalWords, false, true)
      const tv = content.querySelector('.tree-view') as HTMLElement
      if (tv) tv.innerHTML = html
    }

    btn.addEventListener("click", onOpen)
    closeBtn.addEventListener("click", onClose)
    outer.addEventListener("click", onOutsideClick)
    graphBtn.addEventListener("click", onGraphClick)

    window.addCleanup(() => btn.removeEventListener("click", onOpen))
    window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
    window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
    window.addCleanup(() => graphBtn.removeEventListener("click", onGraphClick))

    // Graph controls interactions
    content.addEventListener('input', onInputDepth)
    content.addEventListener('change', onChangeDepth)
    window.addCleanup(() => content.removeEventListener('input', onInputDepth))
    window.addCleanup(() => content.removeEventListener('change', onChangeDepth))
  })
})()
