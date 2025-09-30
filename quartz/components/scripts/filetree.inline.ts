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

  async function buildTreeFromData(): Promise<TreeNode> {
    const root: TreeNode = { name: "root", slug: "", isFolder: true, children: [], level: 0 }

    // use Quartz global content index
    const data = await fetchData
    const allSlugs = Object.keys(data || {})
    console.log("[filetree] total slugs:", allSlugs.length)

    const pathMap = new Map<string, TreeNode>()
    pathMap.set("", root)

    for (const slug of allSlugs) {
      const parts = slug.split("/").filter((p) => p.length > 0)
      let currentPath = ""
      let currentNode: TreeNode | null = root

      for (let i = 0; i < parts.length && currentNode; i++) {
        const part = parts[i]
        const isLastPart = i === parts.length - 1
        const newPath = currentPath ? `${currentPath}/${part}` : part

        // exclude unwanted folders
        if (!isLastPart && shouldExcludeFolder(part)) {
          currentNode = null
          break
        }

        let childNode = pathMap.get(newPath)
        if (!childNode) {
          const isFolder = !isLastPart
          childNode = {
            name: isFolder ? part : part, // slug names already without extension
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
    return root
  }

  function renderTreeNode(node: TreeNode, isRoot = false): string {
    if (isRoot) {
      return node.children.map((child) => renderTreeNode(child)).join("")
    }

    const indent = "&nbsp;&nbsp;".repeat(Math.max(0, node.level - 1))
    const icon = node.isFolder ? "📁" : "📄"
    const prefix = node.level > 1 ? "├── " : ""

    let html = `<div class="tree-item ${node.isFolder ? "folder" : "file"}" data-level="${
      node.level
    }">${indent}${prefix}${icon} `

    if (node.isFolder) {
      html += `<span class="tree-folder-name">${node.name}</span>`
    } else {
      html += `<a href="/${node.slug}" class="tree-file-link">${node.name}</a>`
    }

    html += `</div>`

    if (node.children.length > 0) {
      html += node.children.map((child) => renderTreeNode(child)).join("")
    }

    return html
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

  function openModal(outer: HTMLElement) {
    outer.setAttribute("aria-hidden", "false")
    outer.classList.add("active")
  }

  function closeModal(outer: HTMLElement) {
    outer.setAttribute("aria-hidden", "true")
    outer.classList.remove("active")
  }

  document.addEventListener("nav", () => {
    const fileTreeRoot = document.querySelector(".file-tree") as HTMLElement | null
    if (!fileTreeRoot) return

    const outer = fileTreeRoot.querySelector(".file-tree-modal-outer") as HTMLElement
    const btn = fileTreeRoot.querySelector(".file-tree-button") as HTMLButtonElement
    const closeBtn = fileTreeRoot.querySelector(".file-tree-close") as HTMLButtonElement
    const content = fileTreeRoot.querySelector(".file-tree-content") as HTMLElement
    const statsFolder = fileTreeRoot.querySelector(".stats-folders") as HTMLElement
    const statsFiles = fileTreeRoot.querySelector(".stats-files") as HTMLElement

    const onOpen = async () => {
      openModal(outer)
      console.log("[filetree] button clicked: building tree…")

      try {
        const tree = await buildTreeFromData()
        const stats = calculateStats(tree)
        statsFolder.textContent = `${Math.max(0, stats.folders - 1)} klasör`
        statsFiles.textContent = `${stats.files} dosya`
        content.innerHTML = `<div class="tree-view">${renderTreeNode(tree, true)}</div>`
        console.log("[filetree] built:", { folders: stats.folders, files: stats.files })
      } catch (e) {
        console.error("[filetree] failed to build:", e)
        content.innerHTML = `<div class="tree-loading">Hata: ağacı oluşturamadım.</div>`
      }
    }

    const onClose = () => closeModal(outer)
    const onOutsideClick = (e: MouseEvent) => {
      if (e.target === outer) closeModal(outer)
    }

    btn.addEventListener("click", onOpen)
    closeBtn.addEventListener("click", onClose)
    outer.addEventListener("click", onOutsideClick)

    window.addCleanup(() => btn.removeEventListener("click", onOpen))
    window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
    window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
  })
})()
