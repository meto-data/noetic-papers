(function() {
  function applyFocusMode(enabled: boolean) {
    if (enabled) {
      document.body.classList.add("focus-mode")
      // Add exit button
      if (!document.querySelector(".focus-mode-exit")) {
        const exitBtn = document.createElement("button")
        exitBtn.className = "focus-mode-exit"
        exitBtn.innerHTML = "✕ Odak modundan çık"
        exitBtn.addEventListener("click", () => {
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

  document.addEventListener("nav", () => {
    const focusButton = document.querySelector(".focus-mode-button") as HTMLButtonElement | null
    if (!focusButton) return

    const savedFocusMode = localStorage.getItem("focus-mode") === "true"
    applyFocusMode(savedFocusMode)

    // Toggle focus mode on button click
    const toggleFocus = () => {
      const isCurrentlyFocused = document.body.classList.contains("focus-mode")
      applyFocusMode(!isCurrentlyFocused)
    }

    focusButton.addEventListener("click", toggleFocus)
    window.addCleanup(() => focusButton.removeEventListener("click", toggleFocus))
  })
})()
