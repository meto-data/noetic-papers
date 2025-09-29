import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/glossary.inline"
import style from "./styles/glossary.scss"

export interface GlossaryTermsOptions {
  enableHighlighting: boolean
  enablePopover: boolean
}

const defaultOptions: GlossaryTermsOptions = {
  enableHighlighting: true,
  enablePopover: true,
}

export default ((opts?: Partial<GlossaryTermsOptions>) => {
  const GlossaryTerms: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
    const finalOpts = { ...defaultOptions, ...opts }
    
    // Collect all terms for client-side highlighting
    const allTerms: Array<{ term: string; definition: string }> = []
    for (const file of allFiles) {
      if (file.glossaryTerms) {
        const terms = file.glossaryTerms as Array<{ term: string; definition: string; source: string }>
        allTerms.push(...terms.map(t => ({ term: t.term, definition: t.definition })))
      }
    }
    
    // Remove duplicates
    const uniqueTerms = allTerms.filter((term, index, arr) => 
      arr.findIndex(t => t.term.toLowerCase() === term.term.toLowerCase()) === index
    )
    
    return (
      <div 
        class="glossary-terms" 
        data-terms={JSON.stringify(uniqueTerms)}
        data-enable-highlighting={finalOpts.enableHighlighting}
        data-enable-popover={finalOpts.enablePopover}
      />
    )
  }

  GlossaryTerms.css = style
  GlossaryTerms.afterDOMLoaded = script

  return GlossaryTerms
}) satisfies QuartzComponentConstructor
