  const themeSelect = document.getElementById("theme-select");
  const root = document.documentElement;

  // Apply theme function
  function applyTheme(theme) {
    root.classList.remove("light-theme", "dark-theme");

    if (theme === "dark") {
      root.classList.add("dark-theme");
    } else if (theme === "light") {
      root.classList.add("light-theme");
    }
  }

  // Load saved theme on page load
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;
  } else {
    themeSelect.value = "system";
  }

  // Save theme when changed
  themeSelect.addEventListener("change", function () {
    const selectedTheme = this.value;

    if (selectedTheme === "system") {
      localStorage.removeItem("theme");
      root.classList.remove("light-theme", "dark-theme");
    } else {
      localStorage.setItem("theme", selectedTheme);
      applyTheme(selectedTheme);
    }
  });