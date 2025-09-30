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
    // strip code blocks
    const cleaned = text.replace(/```[\s\S]*?```/g, " ")
    const words = cleaned.match(/\b\p{L}[\p{L}\p{N}'’-]*\b/gu) || []
    return words.length
  }

  async function buildTreeFromData(): Promise<{ root: TreeNode; altFiles: number; wordMap: Map<string, number> }> {
    const root: TreeNode = { name: "root", slug: "", isFolder: true, children: [], level: 0 }

    const data = await fetchData
    const allSlugs = Object.keys(data || {})
    console.log("[filetree] total slugs:", allSlugs.length)

    const pathMap = new Map<string, TreeNode>()
    pathMap.set("", root)

    let altFiles = 0
    const wordMap = new Map<string, number>() // slug -> word count

    for (const slug of allSlugs) {
      const file = data[slug]
      const parts = slug.split("/").filter((p) => p.length > 0)
      let currentPath = ""
      let currentNode: TreeNode | null = root

      for (let i = 0; i < parts.length && currentNode; i++) {
        const part = parts[i]
        const isLastPart = i === parts.length - 1
        const newPath = currentPath ? `${currentPath}/${part}` : part

        if (!isLastPart && shouldExcludeFolder(part)) {
          // Count files under excluded folders as alt files
          altFiles += file ? 1 : 0
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

      // word count for files
      if (file && typeof file.content === "string") {
        wordMap.set(slug, countWords(file.content))
      } else if (file && typeof file.text === "string") {
        wordMap.set(slug, countWords(file.text))
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
    return { root, altFiles, wordMap }
  }

  function renderTreeNode(node: TreeNode, isRoot = false, maxDepth = Infinity): string {
    if (isRoot) {
      return node.children.map((child) => renderTreeNode(child, false, maxDepth)).join("")
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

    if (node.children.length > 0 && node.level < maxDepth) {
      html += node.children.map((child) => renderTreeNode(child, false, maxDepth)).join("")
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

  function groupByDepth(slugs: string[], depth: number): Map<string, number> {
    const map = new Map<string, number>()
    for (const slug of slugs) {
      const parts = slug.split("/").filter(Boolean)
      const key = parts.slice(0, depth).join("/") || "/"
      map.set(key, (map.get(key) || 0) + 1)
    }
    return map
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

    const openModal = () => {
      outer.setAttribute("aria-hidden", "false")
      outer.classList.add("active")
    }
    const closeModal = () => {
      outer.setAttribute("aria-hidden", "true")
      outer.classList.remove("active")
    }

    const onOpen = async () => {
      openModal()
      console.log("[filetree] opening modal…")

      try {
        const { root, altFiles, wordMap } = await buildTreeFromData()
        const stats = calculateStats(root)
        statsFolder.textContent = `${Math.max(0, stats.folders - 1)} klasör`
        statsFiles.textContent = `${stats.files} dosya`
        statsAlt.textContent = `${altFiles} alt dosya`
        const maxDepth = parseInt(depthSelect?.value || "3", 10)
        content.innerHTML = `<div class="tree-view">${renderTreeNode(root, true, maxDepth)}</div>`
        console.log("[filetree] built:", { folders: stats.folders, files: stats.files, altFiles })

        // attach detail view
        detailBtn.onclick = async () => {
          const d = await fetchData
          const slugs = Object.keys(d || {})
          const depth = parseInt(depthSelect?.value || "2", 10)
          const groups = groupByDepth(slugs, depth)

          // compute word-weighted shares
          const totals = new Map<string, number>()
          for (const [slug, file] of Object.entries(d || {})) {
            const key = (slug.split("/").filter(Boolean).slice(0, depth).join("/") || "/")
            const words = wordMap.get(slug) || 0
            totals.set(key, (totals.get(key) || 0) + words)
          }
          const sum = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1
          const rows = Array.from(totals.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([key, words]) => {
              const pct = ((words / sum) * 100).toFixed(1)
              return `<div class="detail-row"><span class="detail-key">${key}</span><span class="detail-bar"><span style="width:${pct}%"></span></span><span class="detail-pct">${pct}%</span></div>`
            })
            .join("")

          content.innerHTML = `
            <div class="detail-view">
              <div class="detail-caption">Kelime ağırlıklı dağılım (derinlik ${depth})</div>
              ${rows || '<div class="tree-loading">Veri bulunamadı</div>'}
            </div>`
        }
      } catch (e) {
        console.error("[filetree] failed:", e)
        content.innerHTML = `<div class="tree-loading">Hata: ağacı oluşturamadım.</div>`
      }
    }

    const onClose = () => closeModal()
    const onOutsideClick = (e: MouseEvent) => {
      if (e.target === outer) closeModal()
    }

    btn.addEventListener("click", onOpen)
    closeBtn.addEventListener("click", onClose)
    outer.addEventListener("click", onOutsideClick)

    window.addCleanup(() => btn.removeEventListener("click", onOpen))
    window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
    window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
  })
})()
