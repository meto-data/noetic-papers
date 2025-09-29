const LIGHT_KEY = "palette-light"
const DARK_KEY = "palette-dark"

type LightKey = "default" | "sereneSky" | "warmSand" | "warmTeal" | "warmPlum" | "warmSlate"
type DarkKey = "default" | "midnightBlue" | "graphite"

function applyPalettes(light: LightKey, dark: DarkKey) {
  // Persist
  localStorage.setItem(LIGHT_KEY, light)
  localStorage.setItem(DARK_KEY, dark)

  // Set attributes used by CSS to gate palettes
  document.documentElement.setAttribute("data-palette-light", light)
  document.documentElement.setAttribute("data-palette-dark", dark)

  const event: CustomEventMap["palettechange"] = new CustomEvent("palettechange", {
    detail: { light, dark },
  })
  document.dispatchEvent(event)
}

function initSelects() {
  const light = (localStorage.getItem(LIGHT_KEY) as LightKey) ?? "default"
  const dark = (localStorage.getItem(DARK_KEY) as DarkKey) ?? "default"

  const lightSelect = document.querySelector(".palette-light-select") as HTMLSelectElement | null
  const darkSelect = document.querySelector(".palette-dark-select") as HTMLSelectElement | null
  if (!lightSelect || !darkSelect) return

  lightSelect.value = light
  darkSelect.value = dark

  const onChange = () => applyPalettes(lightSelect.value as LightKey, darkSelect.value as DarkKey)
  lightSelect.addEventListener("change", onChange)
  darkSelect.addEventListener("change", onChange)

  window.addCleanup(() => lightSelect.removeEventListener("change", onChange))
  window.addCleanup(() => darkSelect.removeEventListener("change", onChange))

  // initial apply
  applyPalettes(light, dark)
}

document.addEventListener("nav", () => {
  initSelects()
})


