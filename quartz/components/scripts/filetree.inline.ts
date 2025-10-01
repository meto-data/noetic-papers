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
           lower === '.ds_store' ||
           lower === '.gitignore' ||
           lower === '.gitkeep'
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

  document.addEventListener("nav", async () => {
    console.log("🌳 FileTree script: updating statistics")
    
    const rootEl = document.querySelector(".file-tree") as HTMLElement | null
    if (!rootEl) return

    const statsFolder = rootEl.querySelector(".stats-folders") as HTMLElement
    const statsFiles = rootEl.querySelector(".stats-files") as HTMLElement
    const statsAlt = rootEl.querySelector(".stats-altfiles") as HTMLElement

    if (!statsFolder || !statsFiles || !statsAlt) return

    try {
      const data = await buildTreeFromData()
      const stats = calculateStats(data.root)
      const totalAllWords = Array.from(data.allWordMap.values()).reduce((a, b) => a + b, 0)
      
      statsFolder.textContent = `${Math.max(0, stats.folders - 1)} klasör`
      statsFiles.textContent = `${stats.files} dosya`
      statsAlt.textContent = `${data.altFiles} alt dosya (${totalAllWords.toLocaleString('tr-TR')} kelime)`
      
      console.log("🌳 Statistics updated:", {
        folders: stats.folders - 1,
        files: stats.files,
        altFiles: data.altFiles,
        totalWords: totalAllWords
      })
    } catch (e) {
      console.error("🌳 Failed to update statistics:", e)
    }
  })
})()