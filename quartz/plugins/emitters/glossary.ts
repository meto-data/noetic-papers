import { QuartzEmitterPlugin } from "../types"
import { FullSlug } from "../../util/path"
import { GlossaryTerm } from "../transformers/glossary"
import { write } from "./helpers"

export const GlossaryPage: QuartzEmitterPlugin = () => {
  return {
    name: "GlossaryPage",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const slug = "glossary" as FullSlug
      
      // Collect all glossary terms from all files
      const allTerms: GlossaryTerm[] = []
      for (const [_tree, vfile] of content) {
        if (vfile.data.glossaryTerms) {
          const terms = vfile.data.glossaryTerms as GlossaryTerm[]
          allTerms.push(...terms)
        }
      }
      
      // Remove duplicates and group by first letter
      const uniqueTerms = allTerms.filter((term, index, arr) => 
        arr.findIndex(t => t.term.toLowerCase() === term.term.toLowerCase()) === index
      )
      
      const termsByLetter: Record<string, GlossaryTerm[]> = {}
      for (const term of uniqueTerms) {
        const firstLetter = term.term[0].toUpperCase()
        if (!termsByLetter[firstLetter]) {
          termsByLetter[firstLetter] = []
        }
        termsByLetter[firstLetter].push(term)
      }
      
      // Sort within each letter group
      for (const letter in termsByLetter) {
        termsByLetter[letter].sort((a, b) => a.term.localeCompare(b.term))
      }
      
      const letters = Object.keys(termsByLetter).sort()
      
      // Generate HTML
      let html = `<!DOCTYPE html>
<html>
<head>
  <title>Sözlük - ${cfg.pageTitle}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../index.css">
</head>
<body data-slug="${slug}">
  <div id="quartz-root" class="page">
    <div id="quartz-body">
      <div class="center">
        <article class="popover-hint">
          <div class="glossary-container">
            <h1>Sözlük</h1>
            <p>Toplam ${uniqueTerms.length} terim</p>
            
            <div class="glossary-index">
              ${letters.map(letter => `<a href="#letter-${letter}" class="letter-link">${letter}</a>`).join('')}
            </div>
            
            <div class="glossary-search">
              <input type="text" placeholder="Terim ara..." class="glossary-search-input" aria-label="Sözlük araması">
            </div>
            
            ${letters.map(letter => `
              <div class="letter-section" id="letter-${letter}">
                <h2 class="letter-header">${letter}</h2>
                <div class="terms-grid">
                  ${termsByLetter[letter].map(term => `
                    <div class="term-card" data-term="${term.term.toLowerCase()}" id="term-${encodeURIComponent(term.term.toLowerCase())}">
                      <h3 class="term-title">${term.term}</h3>
                      <p class="term-definition">${term.definition}</p>
                      <small class="term-source">Kaynak: <a href="../${term.source}">${term.source}</a></small>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </article>
      </div>
    </div>
  </div>
  <script src="../postscript.js"></script>
</body>
</html>`
      
      yield write({ ctx, slug, ext: ".html", content: html })
    },
  }
}