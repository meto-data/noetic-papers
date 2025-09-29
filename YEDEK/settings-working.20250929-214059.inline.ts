const LIGHT_KEY = "palette-light"
const DARK_KEY = "palette-dark"

type LightKey =
  | "default"
  | "sereneSky"
  | "warmSand"
  | "warmTeal"
  | "softMint"
  | "clearBlue"
  | "oliveSage"
  | "stone"
  | "cleanGray"

type DarkKey =
  | "default"
  | "midnightBlue"
  | "graphite"
  | "onyx"
  | "forestNight"
  | "deepTeal"
  | "cobaltDark"
  | "slateDark"
  | "ink"

function applyPalettes(light: LightKey, dark: DarkKey) {
  localStorage.setItem(LIGHT_KEY, light)
  localStorage.setItem(DARK_KEY, dark)
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

document.addEventListener("nav", async () => {
  const settingsRoot = document.querySelector(".settings") as HTMLElement | null
  if (!settingsRoot) return

  const outer = settingsRoot.querySelector(".settings-modal-outer") as HTMLElement
  const btn = settingsRoot.querySelector(".settings-button") as HTMLButtonElement
  const closeBtn = settingsRoot.querySelector(".settings-close") as HTMLButtonElement
  const lightSelect = settingsRoot.querySelector(".palette-light-select") as HTMLSelectElement
  const darkSelect = settingsRoot.querySelector(".palette-dark-select") as HTMLSelectElement

  const light = (localStorage.getItem(LIGHT_KEY) as LightKey) ?? "default"
  const dark = (localStorage.getItem(DARK_KEY) as DarkKey) ?? "default"
  lightSelect.value = light
  darkSelect.value = dark
  applyPalettes(light, dark)

  const onOpen = () => openModal(outer)
  const onClose = () => closeModal(outer)
  const onChange = () => applyPalettes(lightSelect.value as LightKey, darkSelect.value as DarkKey)
  const onOutsideClick = (e: MouseEvent) => {
    if (e.target === outer) closeModal(outer)
  }

  btn.addEventListener("click", onOpen)
  closeBtn.addEventListener("click", onClose)
  outer.addEventListener("click", onOutsideClick)
  lightSelect.addEventListener("change", onChange)
  darkSelect.addEventListener("change", onChange)

  window.addCleanup(() => btn.removeEventListener("click", onOpen))
  window.addCleanup(() => closeBtn.removeEventListener("click", onClose))
  window.addCleanup(() => outer.removeEventListener("click", onOutsideClick))
  window.addCleanup(() => lightSelect.removeEventListener("change", onChange))
  window.addCleanup(() => darkSelect.removeEventListener("change", onChange))
})


