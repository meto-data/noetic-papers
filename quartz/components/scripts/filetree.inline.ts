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
    return EXCLUDED_FOLDERS.some((excluded) => lower === excluded)
  }

  function shouldExcludeFile(fileName: string): boolean {
    const lower = fileName.toLowerCase()
    return lower === 'index' ||
           lower.startsWith('index.') ||
           lower === 'readme' ||
           lower.startsWith('readme.') ||
           lower === '.ds_store' ||
           lower === '.gitignore' ||
           lower === '.gitkeep'
  }

  function countWords(text: string): number {
    if (!text) return 0
    let cleaned = text.replace(/```[\s\S]*?```/g, " ")
    cleaned = cleaned.replace(/`[^`]+`/g, " ")
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    cleaned = cleaned.replace(/[#*_~`]/g, " ")

    const words = cleaned.split(/\s+/).filter(word => word.length > 0)
    return words.length
  }

  function cleanDisplayName(name: string): string {
    let cleanName = name.replace(/-/g, " ")
    if (/^\d+-/.test(name)) {
      const match = name.match(/^(\d+)-/)
      if (match) {
        cleanName = match[1] + "- " + cleanName.substring(match[0].length)
      }
    }
    return cleanName
  }

  async function buildTreeFromData(): Promise<{ root: TreeNode; altFiles: number; altWords: number; wordMap: Map<string, number>; allWordMap: Map<string, number> }> {
    const root: TreeNode = { name: "root", slug: "", isFolder: true, children: [], level: 0 }

    const fetchData = async () => {
      const data = await fetch("/content/index.json").then((res) => res.json())
      return data
    }

    const data = await fetchData()
    const allSlugs = Object.keys(data || {})
    console.log("[filetree] total slugs:", allSlugs.length)

    const pathMap = new Map<string, TreeNode>()
    pathMap.set("", root)

    let altFiles = 0
    let altWords = 0
    const wordMap = new Map<string, number>()
    const allWordMap = new Map<string, number>()

    for (const slug of allSlugs) {
      const file = data[slug]
      const parts = slug.split("/").filter((p) => p.length > 0)

      if (shouldExcludeFile(parts[parts.length - 1])) {
        continue
      }

      let currentPath = ""
      let currentNode: TreeNode | null = root
      let isExcluded = false

      let wordCount = 0
      if (file && typeof file.content === "string") {
        wordCount = countWords(file.content)
      } else if (file && typeof file.text === "string") {
        wordCount = countWords(file.text)
      }
      allWordMap.set(slug, wordCount)

      for (let i = 0; i < parts.length && currentNode; i++) {
        const part = parts[i]
        const isLastPart = i === parts.length - 1
        const newPath = currentPath ? `${currentPath}/${part}` : part

        if (!isLastPart && shouldExcludeFolder(part)) {
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

  function renderTreeNode(node: TreeNode, isRoot = false, maxDepth = Infinity, wordMap?: Map<string, number>, totalWords?: number, showFiles: boolean = true, isDetailView: boolean = false): string {
    if (isRoot) {
      return node.children.map((child) => renderTreeNode(child, false, maxDepth, wordMap, totalWords, showFiles, isDetailView)).join("")
    }

    // Hide files in detail view unless showFiles is true
    if (isDetailView && !node.isFolder && !showFiles) {
      return ""
    }

    const indent = "&nbsp;&nbsp;".repeat(Math.max(0, node.level - 1))
    const icon = node.isFolder ? "📁" : "📄"
    const prefix = node.level > 1 ? "├── " : ""
    const displayName = cleanDisplayName(node.name)

    let html = `<div class="tree-item ${node.isFolder ? "folder" : "file"}" data-level="${node.level}">${indent}${prefix}${icon} `

    if (node.isFolder) {
      html += `<span class="tree-folder-name">${displayName}</span>`
    } else {
      html += `<a href="/${node.slug}" class="tree-file-link">${displayName}</a>`
    }

    // Add word count for files and percentage for folders
    if (wordMap && totalWords && totalWords > 0) {
      if (node.isFolder) {
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
      const allChildren = node.children
        .map((child) => renderTreeNode(child, false, childMaxDepth, wordMap, totalWords, showFiles, isDetailView))
        .join("")
      if (allChildren.trim()) {
        html += allChildren
      }
    }

    return html
  }

  function calculateFolderWords(node: TreeNode, wordMap: Map<string, number>): number {
    if (!node.isFolder) {
      return wordMap.get(node.slug) || 0
    }

    const prefix = node.slug ? node.slug + "/" : ""
    let total = 0
    for (const [slug, words] of wordMap.entries()) {
      if (!prefix) {
        total += words
      } else if (slug.startsWith(prefix)) {
        total += words
      }
    }
    return total
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

    const onOpen = async () => {
      openModal()
      console.log("[filetree] opening modal…")

      try {
        if (!cachedData) {
          cachedData = await buildTreeFromData()
        }
        
        const stats = calculateStats(cachedData.root)
        const totalAllWords = Array.from(cachedData.allWordMap.values()).reduce((a, b) => a + b, 0)

        statsFolder.textContent = `${Math.max(0, stats.folders - 1)} klasör`
        statsFiles.textContent = `${stats.files} dosya`
        statsAlt.textContent = `${cachedData.altFiles} alt dosya (${totalAllWords.toLocaleString('tr-TR')} kelime)`
        
        renderTreeView()
        console.log("[filetree] built:", { folders: stats.folders, files: stats.files, altFiles: cachedData.altFiles, totalAllWords })
      } catch (e) {
        console.error("[filetree] failed:", e)
        content.innerHTML = `<div class="tree-loading">Hata: ağacı oluşturamadım.</div>`
      }
    }

    const onClose = () => closeModal()
    const onOutsideClick = (e: MouseEvent) => {
      if (e.target === outer) closeModal()
    }

    btn.addEventListener("click", onOpen, { passive: false })
    btn.addEventListener("touchend", onOpen, { passive: false })
    closeBtn.addEventListener("click", onClose, { passive: false })
    closeBtn.addEventListener("touchend", onClose, { passive: false })
    outer.addEventListener("click", onOutsideClick)

    window.addCleanup(() => {
      btn.removeEventListener("click", onOpen)
      btn.removeEventListener("touchend", onOpen)
      closeBtn.removeEventListener("click", onClose)
      closeBtn.removeEventListener("touchend", onClose)
      outer.removeEventListener("click", onOutsideClick)
    })
  })
})()