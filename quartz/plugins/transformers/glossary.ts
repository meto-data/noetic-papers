import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"

export interface GlossaryTerm {
  term: string
  definition: string
  source: string // file slug where term was defined
}

export interface GlossaryOptions {
  enableInlineTerms: boolean // term:: definition syntax
  enableFrontmatter: boolean // frontmatter glossary: [...] 
}

const defaultOptions: GlossaryOptions = {
  enableInlineTerms: true,
  enableFrontmatter: true,
}

export const Glossary: QuartzTransformerPlugin<Partial<GlossaryOptions> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  
  return {
    name: "Glossary",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, file) => {
            const terms: GlossaryTerm[] = []
            const slug = file.data.slug as string
            
            // Extract from frontmatter
            if (opts.enableFrontmatter && file.data.frontmatter?.glossary) {
              const frontmatterTerms = file.data.frontmatter.glossary
              if (Array.isArray(frontmatterTerms)) {
                for (const item of frontmatterTerms) {
                  if (item.term && item.def) {
                    terms.push({
                      term: item.term.trim(),
                      definition: item.def.trim(),
                      source: slug,
                    })
                  }
                }
              }
            }
            
            // Extract inline term:: definition
            if (opts.enableInlineTerms) {
              visit(tree, "paragraph", (node) => {
                const text = toString(node)
                const termRegex = /^(.+?)::(.+)$/gm
                let match
                while ((match = termRegex.exec(text)) !== null) {
                  terms.push({
                    term: match[1].trim(),
                    definition: match[2].trim(),
                    source: slug,
                  })
                }
              })
            }
            
            // Store in file data for emitter
            if (!file.data.glossaryTerms) {
              file.data.glossaryTerms = []
            }
            ;(file.data.glossaryTerms as GlossaryTerm[]).push(...terms)
          }
        },
      ]
    },
  }
}
