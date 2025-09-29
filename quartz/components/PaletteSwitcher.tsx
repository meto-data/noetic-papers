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
        <option value="softMint">Soft Mint</option>
        <option value="clearBlue">Clear Blue</option>
        <option value="oliveSage">Olive Sage</option>
        <option value="stone">Stone</option>
        <option value="cleanGray">Clean Gray</option>
      </select>
      <select class="palette-dark-select" aria-label="Dark palette">
        <option value="default">Default Dark</option>
        <option value="midnightBlue">Midnight Blue</option>
        <option value="graphite">Graphite</option>
        <option value="onyx">Onyx</option>
        <option value="forestNight">Forest Night</option>
        <option value="deepTeal">Deep Teal</option>
        <option value="cobaltDark">Cobalt Dark</option>
        <option value="slateDark">Slate Dark</option>
        <option value="ink">Ink</option>
      </select>
    </div>
  )
}

PaletteSwitcher.afterDOMLoaded = paletteScript
PaletteSwitcher.css = styles

export default (() => PaletteSwitcher) satisfies QuartzComponentConstructor


