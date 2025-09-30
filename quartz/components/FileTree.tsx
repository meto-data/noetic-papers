import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import fileTreeScript from "./scripts/filetree.inline"
import styles from "./styles/filetree.scss"
import { classNames } from "../util/lang"

const FileTree: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "file-tree")}>
      <button class="file-tree-button" aria-label="Grafik Görünümü">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M3 3h2v18H3zM7 13h2v8H7zM11 9h2v12h-2zM15 5h2v16h-2zM19 1h2v20h-2z"/>
        </svg>
      </button>

      <div class="file-tree-modal-outer" aria-hidden="true">
        <div class="file-tree-modal" role="dialog" aria-modal="true" aria-label="Dosya Ağacı">
          <div class="file-tree-header">
            <span>📁 Dosya Ağacı</span>
            <div class="file-tree-tools">
              <button class="file-tree-graph" aria-label="Dosya Ağacı">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z"/>
                  <path d="M3,7h18v1H3V7z"/>
                  <path d="M3,9h18v1H3V9z"/>
                  <path d="M3,11h18v1H3V11z"/>
                </svg>
              </button>
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
