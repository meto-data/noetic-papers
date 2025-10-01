import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import fileTreeScript from "./scripts/filetree.inline"
import styles from "./styles/filetree.scss"
import { classNames } from "../util/lang"

const FileTree: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "file-tree")}>
      <div class="file-tree-stats">
        <span class="stats-folders">0 klasör</span>
        <span class="stats-files">0 dosya</span>
        <span class="stats-altfiles">0 alt dosya</span>
      </div>
    </div>
  )
}

FileTree.afterDOMLoaded = fileTreeScript
FileTree.css = styles

export default (() => FileTree) satisfies QuartzComponentConstructor
