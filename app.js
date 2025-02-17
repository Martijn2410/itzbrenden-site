const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

// Ensure elements exist before adding event listeners
if (toggleButton && sidebar) {
    // Restore sidebar state on page load
    document.addEventListener('DOMContentLoaded', function () {
        const savedState = localStorage.getItem('sidebarState');
        if (savedState === 'closed') {
            sidebar.classList.add('close');
            toggleButton.classList.add('rotate'); // Ensure button rotates correctly
        } else {
            sidebar.classList.remove('close');
            toggleButton.classList.remove('rotate'); // Reset button rotation
        }
    });

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
            toggleButton.classList.remove('rotate'); // Ensure main button is in sync
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
            localStorage.setItem('sidebarState', 'closed');
        }

        if (viewportWidth < 811 && sidebar.classList.contains('close')) {
            sidebar.classList.remove('close');
            localStorage.setItem('sidebarState', 'open');
        }

        if (viewportWidth >= 1281 && sidebar.classList.contains('close')) {
            sidebar.classList.remove('close');
            localStorage.setItem('sidebarState', 'open');
        }
    }

    // Attach event listeners
    toggleButton.addEventListener('click', toggleSidebar);
    window.addEventListener('resize', handleResize);

    // Call handleResize initially
    handleResize();
}
