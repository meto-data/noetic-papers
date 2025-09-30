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
            <div class="setting-row">
                <h3>Araçlar</h3>
                <div class="tools-wrapper">
                  <button class="darkmode" aria-label="Tema Değiştir">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      class="dayIcon"
                      x="0px"
                      y="0px"
                      viewBox="0 0 35 35"
                      style="enable-background:new 0 0 35 35"
                      xmlSpace="preserve"
                    >
                      <title>Karanlık Mod</title>
                      <path d="M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      class="nightIcon"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                      style="enable-background:new 0 0 100 100"
                      xmlSpace="preserve"
                      aria-label="Aydınlık Mod"
                    >
                      <title>Aydınlık Mod</title>
                      <path d="M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"></path>
                    </svg>
                  </button>
                  <div class="file-tree">
                    <button class="file-tree-button" aria-label="Dosya Ağacı">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M3 3h2v18H3zM7 13h2v8H7zM11 9h2v12h-2zM15 5h2v16h-2zM19 1h2v20h-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
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