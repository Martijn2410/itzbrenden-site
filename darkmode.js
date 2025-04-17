const themeSelect = document.getElementById('theme-select');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
    document.body.classList.remove('lightmode', 'darkmode');

    if (theme === 'dark') {
        document.body.classList.add('darkmode');
    } else if (theme === 'light') {
        document.body.classList.add('lightmode');
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('darkmode');
    }
}

function getStoredTheme() {
    return localStorage.getItem('theme') || 'system';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getStoredTheme();
    themeSelect.value = currentTheme;
    applyTheme(currentTheme);
});

// On system change (live response)
prefersDarkScheme.addEventListener('change', () => {
    if (getStoredTheme() === 'system') {
        applyTheme('system');
    }
});

// On select change
themeSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    setTheme(selected);
});
