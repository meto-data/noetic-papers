export {}

const SETTINGS_LIGHT_KEY = "palette-light"
const SETTINGS_DARK_KEY = "palette-dark"

type SettingsLightKey =
  | "default"
  | "sereneSky"
  | "warmSand"
  | "warmTeal"
  | "softMint"
  | "clearBlue"
  | "oliveSage"
  | "stone"
  | "cleanGray"
  | "githubLight"
  | "nordLight"
  | "solarizedLight"
  | "obsidianLight"

type SettingsDarkKey =
  | "default"
  | "midnightBlue"
  | "graphite"
  | "onyx"
  | "forestNight"
  | "deepTeal"
  | "cobaltDark"
  | "slateDark"
  | "ink"
  | "githubDark"
  | "nordDark"
  | "solarizedDark"
  | "obsidianDark"

function applyPalettes(light: SettingsLightKey, dark: SettingsDarkKey) {
  localStorage.setItem(SETTINGS_LIGHT_KEY, light)
  localStorage.setItem(SETTINGS_DARK_KEY, dark)
  document.documentElement.setAttribute("data-palette-light", light)
  document.documentElement.setAttribute("data-palette-dark", dark)
  const event: CustomEventMap["palettechange"] = new CustomEvent("palettechange", {
    detail: { light, dark },
  })
  document.dispatchEvent(event)
}

function openModal(outer: HTMLElement) {
  outer.setAttribute("aria-hidden", "false")
  outer.classList.add("active")
}

function closeModal(outer: HTMLElement) {
  outer.setAttribute("aria-hidden", "true")
  outer.classList.remove("active")
}

function initSettings() {
  const settingsRoot = document.querySelector(".settings") as HTMLElement | null
  if (!settingsRoot) return

  const outer = settingsRoot.querySelector(".settings-modal-outer") as HTMLElement
  const btn = settingsRoot.querySelector(".settings-button") as HTMLButtonElement
  const closeBtn = settingsRoot.querySelector(".settings-close") as HTMLButtonElement
  const lightSelect = settingsRoot.querySelector(".palette-light-select") as HTMLSelectElement
  const darkSelect = settingsRoot.querySelector(".palette-dark-select") as HTMLSelectElement
  // font controls
  let fontSelect = settingsRoot.querySelector(".font-select") as HTMLSelectElement | null
  let sizeSelect = settingsRoot.querySelector(".font-size-select") as HTMLInputElement | null

  const light = (localStorage.getItem(SETTINGS_LIGHT_KEY) as SettingsLightKey) ?? "default"
  const dark = (localStorage.getItem(SETTINGS_DARK_KEY) as SettingsDarkKey) ?? "default"
  lightSelect.value = light
  darkSelect.value = dark
  applyPalettes(light, dark)

  // init font controls if present
  const savedFont = localStorage.getItem("font-family") || ""
  const savedSize = localStorage.getItem("font-size") || "1.1rem"
  if (fontSelect) {
    fontSelect.value = savedFont
    if (savedFont) applyFontFamily(savedFont)
  }
  if (sizeSelect) {
    sizeSelect.value = savedSize
    applyFontSize(savedSize)
  }

  const onOpen = () => openModal(outer)
  const onClose = () => closeModal(outer)
  const onChange = () => applyPalettes(lightSelect.value as SettingsLightKey, darkSelect.value as SettingsDarkKey)

  // dynamic font loading
  const FONT_KEY = "font-family"
  const SIZE_KEY = "font-size"
  function applyFontFamily(name: string) {
    const linkId = "dynamic-google-font"
    if (name && !document.getElementById(linkId)) {
      const link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;600;700&display=swap`
      document.head.appendChild(link)
    }
    document.documentElement.style.setProperty("--bodyFont", `"${name}", var(--bodyFont)`) // precedence
    localStorage.setItem(FONT_KEY, name)
  }
  function applyFontSize(size: string) {
    document.documentElement.style.setProperty("--baseFontSize", size)
    localStorage.setItem(SIZE_KEY, size)
  }
  // update preview swatches live
  const updatePreview = () => {
    // no-op; CSS vars update automatically after applyPalettes
  }
  const onOutsideClick = (e: MouseEvent) => {
    if (e.target === outer) closeModal(outer)
  }

  btn.addEventListener("click", onOpen)
  closeBtn.addEventListener("click", onClose)
  outer.addEventListener("click", onOutsideClick)
  const lightHandler = () => { onChange(); updatePreview() }
  const darkHandler = () => { onChange(); updatePreview() }
  lightSelect.addEventListener("change", lightHandler)
  darkSelect.addEventListener("change", darkHandler)
  if (fontSelect) fontSelect.addEventListener("change", () => applyFontFamily(fontSelect!.value))
  if (sizeSelect) sizeSelect.addEventListener("change", () => applyFontSize(sizeSelect!.value))

  window.addCleanup(() => btn.removeEventListener("click", onOpen))
  window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
  window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
  window.addCleanup(() => lightSelect.removeEventListener("change", lightHandler))
  window.addCleanup(() => darkSelect.removeEventListener("change", darkHandler))
  if (fontSelect) window.addCleanup(() => fontSelect?.removeEventListener("change", () => applyFontFamily(fontSelect!.value)))
  if (sizeSelect) window.addCleanup(() => sizeSelect?.removeEventListener("change", () => applyFontSize(sizeSelect!.value)))
}

// run on initial load and on SPA nav
initSettings()
document.addEventListener("nav", initSettings)


