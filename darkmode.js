const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Detect if the browser is Firefox or Firefox-based
function isFirefoxBased() {
    return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');
}

// This runs before anything else to apply the saved theme
function applyTheme(theme) {
    document.body.classList.remove('lightmode', 'darkmode');

    if (isFirefoxBased()) {
        document.body.classList.add('darkmode'); // Force dark mode for Firefox
        return;
    }

    if (theme === 'dark') {
        document.body.classList.add('darkmode');
    } else if (theme === 'light') {
        document.body.classList.add('lightmode');
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.add('lightmode');
    }
}

// Retrieve the stored theme from localStorage or fallback to 'system'
function getStoredTheme() {
    return localStorage.getItem('theme') || 'system';
}

// Set the theme to localStorage and apply it
function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
}

// On page load (This should run every time the page loads to apply the theme)
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getStoredTheme();
    applyTheme(currentTheme);  // Apply the saved theme immediately

    // Only show the theme select dropdown on the page where you want it
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = currentTheme;  // Update the theme selector if available
        themeSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            setTheme(selected);  // Apply the selected theme
        });
    }
});

// Listen for system theme change (live response)
prefersDarkScheme.addEventListener('change', () => {
    if (getStoredTheme() === 'system' && !isFirefoxBased()) {
        applyTheme('system');
    }
});
