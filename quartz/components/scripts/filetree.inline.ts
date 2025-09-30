(function() {
  const EXCLUDED_FOLDERS = [
    "ekler", "görseller", "pdf", "pdfler", "images", "assets",
    "attachments", "files", "media", "resimler", "dosyalar"
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
    return EXCLUDED_FOLDERS.some((excluded) => lower === excluded || lower.includes(excluded))
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

  async function buildTreeFromData(): Promise<{ root: TreeNode; altFiles: number; altWords: number; wordMap: Map<string, number> }> {
    const root: TreeNode = { name: "root", slug: "", isFolder: true, children: [], level: 0 }

    const data = await fetchData
    const allSlugs = Object.keys(data || {})
    console.log("[filetree] total slugs:", allSlugs.length)

    const pathMap = new Map<string, TreeNode>()
    pathMap.set("", root)

    let altFiles = 0
    let altWords = 0
    const wordMap = new Map<string, number>() // slug -> word count

    for (const slug of allSlugs) {
      const file = data[slug]
      const parts = slug.split("/").filter((p) => p.length > 0)
      let currentPath = ""
      let currentNode: TreeNode | null = root

      // Calculate word count first
      let wordCount = 0
      if (file && typeof file.content === "string") {
        wordCount = countWords(file.content)
        wordMap.set(slug, wordCount)
      } else if (file && typeof file.text === "string") {
        wordCount = countWords(file.text)
        wordMap.set(slug, wordCount)
      }

      for (let i = 0; i < parts.length && currentNode; i++) {
        const part = parts[i]
        const isLastPart = i === parts.length - 1
        const newPath = currentPath ? `${currentPath}/${part}` : part

        if (!isLastPart && shouldExcludeFolder(part)) {
          // Count files under excluded folders as alt files
          altFiles += file ? 1 : 0
          altWords += wordCount
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
    return { root, altFiles, altWords, wordMap }
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

  function renderTreeNode(node: TreeNode, isRoot = false, maxDepth = Infinity, wordMap?: Map<string, number>, totalWords?: number): string {
    if (isRoot) {
      return node.children.map((child) => renderTreeNode(child, false, maxDepth, wordMap, totalWords)).join("")
    }

    const indent = "&nbsp;&nbsp;".repeat(Math.max(0, node.level - 1))
    const icon = node.isFolder ? "📁" : "📄"
    const prefix = node.level > 1 ? "├── " : ""
    const displayName = cleanDisplayName(node.name)

    let html = `<div class="tree-item ${node.isFolder ? "folder" : "file"}" data-level="${
      node.level
    }">${indent}${prefix}${icon} `

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
        const percentage = totalWords > 0 ? ((folderWords / totalWords) * 100).toFixed(2).replace('.', ',') : "0,00"
        html += ` <span class="word-count">(${folderWords.toLocaleString('tr-TR')} kelime - ${percentage}%)</span>`
      } else {
        const fileWords = wordMap.get(node.slug) || 0
        const percentage = totalWords > 0 ? ((fileWords / totalWords) * 100).toFixed(2).replace('.', ',') : "0,00"
        html += ` <span class="word-count">(${fileWords.toLocaleString('tr-TR')} kelime - ${percentage}%)</span>`
      }
    }

    html += `</div>`

    if (node.children.length > 0 && node.level < maxDepth) {
      const childMaxDepth = maxDepth
      html += node.children.map((child) => renderTreeNode(child, false, childMaxDepth, wordMap, totalWords)).join("")
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
    const detailBtn = rootEl.querySelector(".file-tree-detail") as HTMLButtonElement
    const depthSelect = rootEl.querySelector(".detail-depth") as HTMLSelectElement

    let cachedData: { root: TreeNode; altFiles: number; altWords: number; wordMap: Map<string, number> } | null = null

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
      content.innerHTML = `<div class="tree-view">${renderTreeNode(cachedData.root, true, Infinity)}</div>`
    }

    const renderDetailView = async () => {
      if (!cachedData) return
      const depth = parseInt(depthSelect?.value || "2", 10)

      // Calculate total words for percentage calculation
      const totalWords = Array.from(cachedData.wordMap.values()).reduce((a, b) => a + b, 0)

      // Use the same tree rendering but with word counts and percentages
      const treeHtml = renderTreeNode(cachedData.root, true, Infinity, cachedData.wordMap, totalWords)

      content.innerHTML = `
        <div class="detail-view">
          <div class="detail-caption">Kelime ağırlıklı dosya ağacı (derinlik ${depth})</div>
          <div class="tree-view">${treeHtml}</div>
        </div>`
    }

    const onOpen = async () => {
      openModal()
      console.log("[filetree] opening modal…")

      try {
        cachedData = await buildTreeFromData()
        const stats = calculateStats(cachedData.root)
        statsFolder.textContent = `${Math.max(0, stats.folders - 1)} klasör`
        statsFiles.textContent = `${stats.files} dosya`
        statsAlt.textContent = `${cachedData.altFiles} alt dosya (${cachedData.altWords.toLocaleString('tr-TR')} kelime)`
        renderTreeView()
        console.log("[filetree] built:", { folders: stats.folders, files: stats.files, altFiles: cachedData.altFiles, altWords: cachedData.altWords })
      } catch (e) {
        console.error("[filetree] failed:", e)
        content.innerHTML = `<div class="tree-loading">Hata: ağacı oluşturamadım.</div>`
      }
    }

    const onDepthChange = () => {
      renderTreeView()
    }

    const onClose = () => closeModal()
    const onOutsideClick = (e: MouseEvent) => {
      if (e.target === outer) closeModal()
    }

    btn.addEventListener("click", onOpen)
    closeBtn.addEventListener("click", onClose)
    outer.addEventListener("click", onOutsideClick)
    depthSelect.addEventListener("change", onDepthChange)
    detailBtn.addEventListener("click", renderDetailView)

    window.addCleanup(() => btn.removeEventListener("click", onOpen))
    window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
    window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
    window.addCleanup(() => depthSelect.removeEventListener("change", onDepthChange))
    window.addCleanup(() => detailBtn.removeEventListener("click", renderDetailView))
  })
})()
