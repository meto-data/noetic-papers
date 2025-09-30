import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import fileTreeScript from "./scripts/filetree.inline"
import styles from "./styles/filetree.scss"
import { classNames } from "../util/lang"

const FileTree: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "file-tree")}>
      <button class="file-tree-button" aria-label="Dosya ağacı">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z"/>
          <path d="M3,7h18v1H3V7z"/>
          <path d="M3,9h18v1H3V9z"/>
          <path d="M3,11h18v1H3V11z"/>
        </svg>
      </button>

      <div class="file-tree-modal-outer" aria-hidden="true">
        <div class="file-tree-modal" role="dialog" aria-modal="true" aria-label="Dosya Ağacı">
          <div class="file-tree-header">
            <span>📁 Dosya Ağacı</span>
            <button class="file-tree-close" aria-label="Kapat">×</button>
          </div>
          <div class="file-tree-stats">
            <span class="stats-folders">0 klasör</span>
            <span class="stats-files">0 dosya</span>
          </div>
          <div class="file-tree-content">
            <div class="tree-loading">Yükleniyor...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

FileTree.afterDOMLoaded = fileTreeScript
FileTree.css = styles

export default (() => FileTree) satisfies QuartzComponentConstructor
