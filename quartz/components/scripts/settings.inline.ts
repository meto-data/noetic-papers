
document.addEventListener("DOMContentLoaded", () => {
  const settingsRoots = document.querySelectorAll(".settings");
  if (settingsRoots.length === 0) return;

  const SETTINGS_LIGHT_KEY = "palette-light";
  const SETTINGS_DARK_KEY = "palette-dark";

  // Initial state
  const light = localStorage.getItem(SETTINGS_LIGHT_KEY) ?? "default";
  const dark = localStorage.getItem(SETTINGS_DARK_KEY) ?? "default";
  const savedFont = localStorage.getItem("font-family") || "";
  const savedSize = localStorage.getItem("font-size") || "1.1rem";

  function applyPalettes(light: string, dark: string) {
    localStorage.setItem(SETTINGS_LIGHT_KEY, light);
    localStorage.setItem(SETTINGS_DARK_KEY, dark);
    document.documentElement.setAttribute("data-palette-light", light);
    document.documentElement.setAttribute("data-palette-dark", dark);
  }

  function applyFontFamily(name: string) {
    const linkId = "dynamic-google-font";
    let existingLink = document.getElementById(linkId) as HTMLLinkElement | null;
    if (existingLink) existingLink.remove();
    
    if (name && name !== "Inter") {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap`;
      document.head.appendChild(link);
      document.documentElement.style.setProperty("--bodyFont", `"${name}", system-ui, sans-serif`);
      document.documentElement.style.setProperty("--headerFont", `"${name}", system-ui, sans-serif`);
    } else {
      document.documentElement.style.removeProperty("--bodyFont");
      document.documentElement.style.removeProperty("--headerFont");
    }
    localStorage.setItem("font-family", name);
  }

  function applyFontSize(size: string) {
    document.documentElement.style.setProperty("--baseFontSize", size);
    localStorage.setItem("font-size", size);
  }
  
  applyPalettes(light, dark);
  if (savedFont) applyFontFamily(savedFont);
  applyFontSize(savedSize);

  settingsRoots.forEach(settingsRoot => {
    const btn = settingsRoot.querySelector(".settings-button") as HTMLButtonElement;
    const outer = settingsRoot.querySelector(".settings-modal-outer") as HTMLElement;
    const closeBtn = settingsRoot.querySelector(".settings-close") as HTMLButtonElement;
    const lightSelect = settingsRoot.querySelector(".palette-light-select") as HTMLSelectElement;
    const darkSelect = settingsRoot.querySelector(".palette-dark-select") as HTMLSelectElement;
    const fontSelect = settingsRoot.querySelector(".font-select") as HTMLSelectElement | null;
    const sizeSelect = settingsRoot.querySelector(".font-size-select") as HTMLSelectElement | null;

    if (lightSelect) lightSelect.value = light;
    if (darkSelect) darkSelect.value = dark;
    if (fontSelect) fontSelect.value = savedFont;
    if (sizeSelect) sizeSelect.value = savedSize;

    function openModal() {
      outer.classList.add("active");
      outer.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
      outer.classList.remove("active");
      outer.setAttribute("aria-hidden", "true");
    }

    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal();
    });

    closeBtn?.addEventListener("click", closeModal);
    outer?.addEventListener("click", (e) => {
      if (e.target === outer) {
        closeModal();
      }
    });

    lightSelect?.addEventListener("change", () => applyPalettes(lightSelect.value, darkSelect.value));
    darkSelect?.addEventListener("change", () => applyPalettes(lightSelect.value, darkSelect.value));
    fontSelect?.addEventListener("change", () => applyFontFamily(fontSelect.value));
    sizeSelect?.addEventListener("change", () => applyFontSize(sizeSelect.value));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && outer.classList.contains("active")) {
        closeModal();
      }
    });
  });
});
