const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

// Function to toggle sidebar and save state
function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');

    closeAllSubMenus();

    // Save the sidebar state in localStorage
    localStorage.setItem('sidebarState', sidebar.classList.contains('close') ? 'closed' : 'open');
}

// Function to toggle submenu
function toggleSubMenu(button) {
    if (!button.nextElementSibling.classList.contains('show')) {
        closeAllSubMenus();
    }

    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if (sidebar.classList.contains('close')) {
        sidebar.classList.remove('close');
        toggleButton.classList.toggle('rotate');
        localStorage.setItem('sidebarState', 'open'); // Save new state
    }
}

// Function to close all submenus
function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    });
}

// Function to handle resizing and apply the required classes
function handleResize() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 1280 && !sidebar.classList.contains('close')) {
        sidebar.classList.add('close');
    }

    if (viewportWidth < 811 && sidebar.classList.contains('close')) {
        sidebar.classList.remove('close');
    }

    if (viewportWidth >= 1281 && sidebar.classList.contains('close')) {
        sidebar.classList.remove('close');
    }
}

// Restore sidebar state on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState === 'closed') {
        sidebar.classList.add('close');
    } else {
        sidebar.classList.remove('close');
    }
});

// Attach event listeners
window.addEventListener('resize', handleResize);
toggleButton.addEventListener('click', toggleSidebar);

// Call handleResize initially
handleResize();
