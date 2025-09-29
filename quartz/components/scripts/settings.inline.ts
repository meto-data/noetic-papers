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

function applyFocusMode(enabled: boolean) {
  if (enabled) {
    document.body.classList.add("focus-mode")
    // Add exit button
    if (!document.querySelector(".focus-mode-exit")) {
      const exitBtn = document.createElement("button")
      exitBtn.className = "focus-mode-exit"
      exitBtn.innerHTML = "✕ Odak modundan çık"
      exitBtn.addEventListener("click", () => {
        const toggle = document.querySelector(".focus-mode-toggle") as HTMLInputElement | null
        if (toggle) toggle.checked = false
        applyFocusMode(false)
      })
      document.body.appendChild(exitBtn)
    }
  } else {
    document.body.classList.remove("focus-mode")
    document.querySelector(".focus-mode-exit")?.remove()
  }
  localStorage.setItem("focus-mode", enabled ? "true" : "false")
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
  const focusToggle = settingsRoot.querySelector(".focus-mode-toggle") as HTMLInputElement | null

  const light = (localStorage.getItem(SETTINGS_LIGHT_KEY) as SettingsLightKey) ?? "default"
  const dark = (localStorage.getItem(SETTINGS_DARK_KEY) as SettingsDarkKey) ?? "default"
  const savedFont = localStorage.getItem("font-family") || ""
  const savedSize = localStorage.getItem("font-size") || "1.1rem"
  const savedFocusMode = localStorage.getItem("focus-mode") === "true"
  
  lightSelect.value = light
  darkSelect.value = dark
  if (fontSelect) fontSelect.value = savedFont
  if (sizeSelect) sizeSelect.value = savedSize
  if (focusToggle) focusToggle.checked = savedFocusMode
  
  applyPalettes(light, dark)
  if (savedFont) applyFontFamily(savedFont)
  applyFontSize(savedSize)
  applyFocusMode(savedFocusMode)

  const onOpen = () => openModal(outer)
  const onClose = () => closeModal(outer)
  const onChange = () => applyPalettes(lightSelect.value as SettingsLightKey, darkSelect.value as SettingsDarkKey)
  const onOutsideClick = (e: MouseEvent) => {
    if (e.target === outer) closeModal(outer)
  }

  btn.addEventListener("click", onOpen)
  closeBtn.addEventListener("click", onClose)
  outer.addEventListener("click", onOutsideClick)
  lightSelect.addEventListener("change", onChange)
  darkSelect.addEventListener("change", onChange)
  if (fontSelect) fontSelect.addEventListener("change", () => applyFontFamily(fontSelect!.value))
  if (sizeSelect) sizeSelect.addEventListener("change", () => applyFontSize(sizeSelect!.value))
  if (focusToggle) focusToggle.addEventListener("change", () => applyFocusMode(focusToggle!.checked))

  window.addCleanup(() => btn.removeEventListener("click", onOpen))
  window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
  window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
  window.addCleanup(() => lightSelect.removeEventListener("change", onChange))
  window.addCleanup(() => darkSelect.removeEventListener("change", onChange))
  if (fontSelect) window.addCleanup(() => fontSelect?.removeEventListener("change", () => applyFontFamily(fontSelect!.value)))
  if (sizeSelect) window.addCleanup(() => sizeSelect?.removeEventListener("change", () => applyFontSize(sizeSelect!.value)))
  if (focusToggle) window.addCleanup(() => focusToggle?.removeEventListener("change", () => applyFocusMode(focusToggle!.checked)))
})
})()