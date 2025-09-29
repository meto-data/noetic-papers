// @ts-ignore
import paletteScript from "./scripts/palette.inline"
import styles from "./styles/palette.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PaletteSwitcher: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "palette-switcher")}>
      <select class="palette-light-select" aria-label="Light palette">
        <option value="default">Default Light</option>
        <option value="sereneSky">Serene Sky</option>
        <option value="warmSand">Warm Sand</option>
        <option value="warmTeal">Warm Teal</option>
        <option value="warmPlum">Warm Plum</option>
        <option value="warmSlate">Warm Slate</option>
      </select>
      <select class="palette-dark-select" aria-label="Dark palette">
        <option value="default">Default Dark</option>
        <option value="midnightBlue">Midnight Blue</option>
        <option value="graphite">Graphite</option>
      </select>
    </div>
  )
}

PaletteSwitcher.afterDOMLoaded = paletteScript
PaletteSwitcher.css = styles

export default (() => PaletteSwitcher) satisfies QuartzComponentConstructor


