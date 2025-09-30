
// @ts-ignore
import settingsScript from "./scripts/settings.inline"
// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
// @ts-ignore
import fileTreeScript from "./scripts/filetree.inline"
import styles from "./styles/settings.scss"
import darkmodeStyles from "./styles/darkmode.scss"
import filetreeStyles from "./styles/filetree.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { concatenateResources } from "../util/resources"
import MobileOnly from "./MobileOnly"
import Darkmode from "./Darkmode"
import FileTree from "./FileTree"

const Settings: QuartzComponent = (props: QuartzComponentProps) => {
  const { displayClass, cfg } = props
  return (
    <div class={classNames(displayClass, "settings")}>
      <button class="settings-button" aria-label="Ayarlar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M19.14,12.94a7.44,7.44,0,0,0,.05-.94,7.44,7.44,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.28,7.28,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,13.8,2H10.2a.5.5,0,0,0-.49.42L9.33,5.07a7.28,7.28,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4.86,11.06a7.44,7.44,0,0,0-.05.94,7.44,7.44,0,0,0,.05.94L2.75,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.28,7.28,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.49.42h3.6a.5.5,0,0,0,.49-.42l.38-2.65a7.28,7.28,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
        </svg>
      </button>

      <div class="settings-modal-outer" aria-hidden="true">
        <div class="settings-modal" role="dialog" aria-modal="true" aria-label="Ayarlar">
          <div class="settings-header">
            <span>Ayarlar</span>
            <button class="settings-close" aria-label="Kapat">×</button>
          </div>
          <div class="settings-body">
            <MobileOnly>
              <div class="setting-row">
                  <h3>Araçlar</h3>
                  <div class="tools-wrapper">
                    <Darkmode {...props} />
                    <FileTree {...props} />
                  </div>
              </div>
            </MobileOnly>
            <div class="setting-row">
              <h3>Görünüm</h3>
              <label>
                Aydınlık tema
                <select class="palette-light-select">
                  <option value="default">Default Light</option>
                  <option value="sereneSky">Serene Sky</option>
                  <option value="warmSand">Warm Sand</option>
                  <option value="warmTeal">Warm Teal</option>
                  <option value="softMint">Soft Mint</option>
                  <option value="clearBlue">Clear Blue</option>
                  <option value="oliveSage">Olive Sage</option>
                  <option value="stone">Stone</option>
                  <option value="cleanGray">Clean Gray</option>
                  <option value="githubLight">GitHub Light</option>
                  <option value="nordLight">Nord Light</option>
                  <option value="solarizedLight">Solarized Light</option>
                  <option value="obsidianPrimary">Obsidian Primary</option>
                </select>
              </label>

              <label>
                Karanlık tema
                <select class="palette-dark-select">
                  <option value="default">Default Dark</option>
                  <option value="midnightBlue">Midnight Blue</option>
                  <option value="graphite">Graphite</option>
                  <option value="onyx">Onyx</option>
                  <option value="forestNight">Forest Night</option>
                  <option value="deepTeal">Deep Teal</option>
                  <option value="cobaltDark">Cobalt Dark</option>
                  <option value="slateDark">Slate Dark</option>
                  <option value="ink">Ink</option>
                  <option value="githubDark">GitHub Dark</option>
                  <option value="nordDark">Nord Dark</option>
                  <option value="solarizedDark">Solarized Dark</option>
                  <option value="obsidianPrimary">Obsidian Primary</option>
                </select>
              </label>

              <label>
                Yazı tipi
                <select class="font-select">
                  <option value="">Varsayılan (Inter)</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                  <option value="Noto Sans">Noto Sans</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Merriweather">Merriweather (Serif)</option>
                  <option value="Playfair Display">Playfair Display (Serif)</option>
                </select>
              </label>

              <label>
                Yazı boyutu
                <select class="font-size-select">
                  <option value="0.9rem">Çok küçük</option>
                  <option value="1.0rem">Küçük</option>
                  <option value="1.1rem" selected>Orta (Varsayılan)</option>
                  <option value="1.2rem">Büyük</option>
                  <option value="1.3rem">Çok büyük</option>
                  <option value="1.4rem">Dev</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Settings.afterDOMLoaded = concatenateResources([settingsScript, darkmodeScript, fileTreeScript])
Settings.css = concatenateResources([styles, darkmodeStyles, filetreeStyles])

export default (() => Settings) satisfies QuartzComponentConstructor
