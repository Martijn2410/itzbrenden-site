// detect-browser.js

document.addEventListener("DOMContentLoaded", function () {
    const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("firefox");
  
    if (isFirefox) {
      document.body.classList.add("force-dark-mode");
    }
  });
  