(function() {
  let glossaryTerms: Array<{ term: string; definition: string }> = []
  let enableHighlighting = true
  let enablePopover = true
  
  function createPopover(term: string, definition: string, targetElement: HTMLElement) {
    const popover = document.createElement("div")
    popover.className = "glossary-popover"
    popover.innerHTML = `
      <div class="glossary-popover-content">
        <strong>${term}</strong>
        <p>${definition}</p>
        <a href="/glossary#term-${encodeURIComponent(term.toLowerCase())}" class="glossary-link">Sözlükte aç →</a>
      </div>
    `
    
    document.body.appendChild(popover)
    
    // Position popover
    const rect = targetElement.getBoundingClientRect()
    const popoverRect = popover.getBoundingClientRect()
    
    let left = rect.left + (rect.width / 2) - (popoverRect.width / 2)
    let top = rect.top - popoverRect.height - 8
    
    // Keep popover in viewport
    if (left < 8) left = 8
    if (left + popoverRect.width > window.innerWidth - 8) {
      left = window.innerWidth - popoverRect.width - 8
    }
    if (top < 8) {
      top = rect.bottom + 8
    }
    
    popover.style.left = `${left}px`
    popover.style.top = `${top}px`
    
    return popover
  }
  
  function removePopovers() {
    document.querySelectorAll(".glossary-popover").forEach(p => p.remove())
  }
  
  function highlightTermsInContent() {
    if (!enableHighlighting || glossaryTerms.length === 0) return
    
    const contentArea = document.querySelector("article") || document.querySelector(".center")
    if (!contentArea) return
    
    // Sort terms by length (longest first for better matching)
    const sortedTerms = [...glossaryTerms].sort((a, b) => b.term.length - a.term.length)
    
    function highlightInTextNode(textNode: Text) {
      const text = textNode.textContent || ""
      let modifiedText = text
      const replacements: Array<{ start: number; end: number; replacement: string }> = []
      
      for (const { term, definition } of sortedTerms) {
        const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\b`, 'gi')
        let match
        while ((match = regex.exec(text)) !== null) {
          // Check if this position is already covered by a longer term
          const overlaps = replacements.some(r => 
            (match!.index >= r.start && match!.index < r.end) ||
            (match!.index + match![0].length > r.start && match!.index + match![0].length <= r.end)
          )
          
          if (!overlaps) {
            replacements.push({
              start: match.index,
              end: match.index + match[0].length,
              replacement: `<span class="glossary-term" data-term="${term}" data-definition="${definition}">${match[0]}</span>`
            })
          }
        }
      }
      
      if (replacements.length > 0) {
        // Sort by start position (descending) to replace from end to start
        replacements.sort((a, b) => b.start - a.start)
        
        for (const { start, end, replacement } of replacements) {
          modifiedText = modifiedText.slice(0, start) + replacement + modifiedText.slice(end)
        }
        
        // Replace text node with HTML
        const wrapper = document.createElement("span")
        wrapper.innerHTML = modifiedText
        textNode.parentNode?.replaceChild(wrapper, textNode)
      }
    }
    
    // Walk through text nodes
    const walker = document.createTreeWalker(
      contentArea,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          
          // Skip if already highlighted or in certain elements
          if (parent.classList.contains("glossary-term") ||
              parent.tagName === "CODE" ||
              parent.tagName === "PRE" ||
              parent.classList.contains("search-button") ||
              parent.classList.contains("settings-button")) {
            return NodeFilter.FILTER_REJECT
          }
          
          return NodeFilter.FILTER_ACCEPT
        }
      }
    )
    
    const textNodes: Text[] = []
    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }
    
    // Process text nodes
    for (const textNode of textNodes) {
      highlightInTextNode(textNode)
    }
    
    // Add event listeners to highlighted terms
    if (enablePopover) {
      document.querySelectorAll(".glossary-term").forEach(termEl => {
        const element = termEl as HTMLElement
        let popover: HTMLElement | null = null
        
        element.addEventListener("mouseenter", () => {
          const term = element.dataset.term || ""
          const definition = element.dataset.definition || ""
          popover = createPopover(term, definition, element)
        })
        
        element.addEventListener("mouseleave", () => {
          if (popover) {
            popover.remove()
            popover = null
          }
        })
        
        // Mobile: tap to show/hide
        element.addEventListener("click", (e) => {
          e.preventDefault()
          if (popover) {
            popover.remove()
            popover = null
          } else {
            removePopovers()
            const term = element.dataset.term || ""
            const definition = element.dataset.definition || ""
            popover = createPopover(term, definition, element)
            
            // Auto-hide after 3 seconds on mobile
            setTimeout(() => {
              if (popover) {
                popover.remove()
                popover = null
              }
            }, 3000)
          }
        })
      })
    }
  }
  
  function initGlossary() {
    const glossaryContainer = document.querySelector(".glossary-terms")
    if (!glossaryContainer) return
    
    const termsData = glossaryContainer.getAttribute("data-terms")
    enableHighlighting = glossaryContainer.getAttribute("data-enable-highlighting") === "true"
    enablePopover = glossaryContainer.getAttribute("data-enable-popover") === "true"
    
    if (termsData) {
      try {
        glossaryTerms = JSON.parse(termsData)
        highlightTermsInContent()
      } catch (e) {
        console.warn("Failed to parse glossary terms:", e)
      }
    }
    
    // Add search functionality for glossary page
    const searchInput = document.querySelector(".glossary-search-input") as HTMLInputElement
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase()
        const termCards = document.querySelectorAll(".term-card")
        
        termCards.forEach(card => {
          const term = (card as HTMLElement).dataset.term || ""
          const visible = term.includes(query) || query === ""
          ;(card as HTMLElement).style.display = visible ? "block" : "none"
        })
        
        // Hide empty letter sections
        document.querySelectorAll(".letter-section").forEach(section => {
          const visibleCards = section.querySelectorAll(".term-card:not([style*='display: none'])")
          ;(section as HTMLElement).style.display = visibleCards.length > 0 ? "block" : "none"
        })
      })
    }
  }
  
  document.addEventListener("nav", () => {
    removePopovers()
    initGlossary()
  })
})()
