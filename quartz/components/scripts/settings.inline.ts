(function() {
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
  | "obsidianPrimary"

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
  | "obsidianPrimary"

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

function applyFontFamily(name: string) {
  const linkId = "dynamic-google-font"
  let existingLink = document.getElementById(linkId) as HTMLLinkElement | null
  if (existingLink) existingLink.remove()
  
  if (name && name !== "Inter") {
    const link = document.createElement("link")
    link.id = linkId
    link.rel = "stylesheet"
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap`
    document.head.appendChild(link)
    document.documentElement.style.setProperty("--bodyFont", `"${name}", system-ui, sans-serif`)
    document.documentElement.style.setProperty("--headerFont", `"${name}", system-ui, sans-serif`)
  } else {
    document.documentElement.style.removeProperty("--bodyFont")
    document.documentElement.style.removeProperty("--headerFont")
  }
  localStorage.setItem("font-family", name)
}

function applyFontSize(size: string) {
  document.documentElement.style.setProperty("--baseFontSize", size)
  localStorage.setItem("font-size", size)
}


function openModal(outer: HTMLElement) {
  outer.setAttribute("aria-hidden", "false")
  outer.classList.add("active")
}

function closeModal(outer: HTMLElement) {
  outer.setAttribute("aria-hidden", "true")
  outer.classList.remove("active")
}

document.addEventListener("nav", async () => {
  const settingsRoot = document.querySelector(".settings") as HTMLElement | null
  if (!settingsRoot) return

  const outer = settingsRoot.querySelector(".settings-modal-outer") as HTMLElement
  const btn = settingsRoot.querySelector(".settings-button") as HTMLButtonElement
  const closeBtn = settingsRoot.querySelector(".settings-close") as HTMLButtonElement
  const lightSelect = settingsRoot.querySelector(".palette-light-select") as HTMLSelectElement
  const darkSelect = settingsRoot.querySelector(".palette-dark-select") as HTMLSelectElement
  const fontSelect = settingsRoot.querySelector(".font-select") as HTMLSelectElement | null
  const sizeSelect = settingsRoot.querySelector(".font-size-select") as HTMLSelectElement | null

  // Debug: Check if elements exist
  if (!btn) {
    console.warn("Settings button not found")
    return
  }
  if (!outer) {
    console.warn("Settings modal outer not found")
    return
  }

  const light = (localStorage.getItem(SETTINGS_LIGHT_KEY) as SettingsLightKey) ?? "default"
  const dark = (localStorage.getItem(SETTINGS_DARK_KEY) as SettingsDarkKey) ?? "default"
  const savedFont = localStorage.getItem("font-family") || ""
  const savedSize = localStorage.getItem("font-size") || "1.1rem"
  lightSelect.value = light
  darkSelect.value = dark
  if (fontSelect) fontSelect.value = savedFont
  if (sizeSelect) sizeSelect.value = savedSize
  
  applyPalettes(light, dark)
  if (savedFont) applyFontFamily(savedFont)
  applyFontSize(savedSize)

  const onOpen = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    openModal(outer)
  }
  const onClose = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    closeModal(outer)
  }
  const onChange = () => applyPalettes(lightSelect.value as SettingsLightKey, darkSelect.value as SettingsDarkKey)
  const onOutsideClick = (e: MouseEvent) => {
    if (e.target === outer) closeModal(outer)
  }

  // Remove existing listeners first
  btn.removeEventListener("click", onOpen)
  closeBtn.removeEventListener("click", onClose)
  outer.removeEventListener("click", onOutsideClick)
  lightSelect.removeEventListener("change", onChange)
  darkSelect.removeEventListener("change", onChange)

  // Add new listeners
  btn.addEventListener("click", onOpen, { passive: false })
  closeBtn.addEventListener("click", onClose, { passive: false })
  outer.addEventListener("click", onOutsideClick)
  lightSelect.addEventListener("change", onChange)
  darkSelect.addEventListener("change", onChange)
  if (fontSelect) {
    fontSelect.removeEventListener("change", () => applyFontFamily(fontSelect!.value))
    fontSelect.addEventListener("change", () => applyFontFamily(fontSelect!.value))
  }
  if (sizeSelect) {
    sizeSelect.removeEventListener("change", () => applyFontSize(sizeSelect!.value))
    sizeSelect.addEventListener("change", () => applyFontSize(sizeSelect!.value))
  }

  window.addCleanup(() => {
    btn.removeEventListener("click", onOpen)
    closeBtn.removeEventListener("click", onClose)
    outer.removeEventListener("click", onOutsideClick)
    lightSelect.removeEventListener("change", onChange)
    darkSelect.removeEventListener("change", onChange)
    if (fontSelect) fontSelect.removeEventListener("change", () => applyFontFamily(fontSelect!.value))
    if (sizeSelect) sizeSelect.removeEventListener("change", () => applyFontSize(sizeSelect!.value))
  })
})
})()