import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import fileTreeScript from "./scripts/filetree.inline"
import styles from "./styles/filetree.scss"
import { classNames } from "../util/lang"

const FileTree: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "file-tree")}>
      <button class="file-tree-button" aria-label="Dosya Ağacı">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M3 3h2v18H3zM7 13h2v8H7zM11 9h2v12h-2zM15 5h2v16h-2zM19 1h2v20h-2z"/>
        </svg>
      </button>

      <div class="file-tree-modal-outer" aria-hidden="true">
        <div class="file-tree-modal" role="dialog" aria-modal="true" aria-label="Dosya Ağacı">
          <div class="file-tree-header">
            <span>📁 Dosya Ağacı</span>
            <div class="file-tree-tools">
              <button class="file-tree-close" aria-label="Kapat">×</button>
            </div>
          </div>
          <div class="file-tree-stats">
            <span class="stats-folders">0 klasör</span>
            <span class="stats-files">0 dosya</span>
            <span class="stats-altfiles">0 alt dosya</span>
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
