const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

// Function to handle sidebar state based on screen width
function handleResponsiveSidebar() {
  const width = window.innerWidth;

  if (width < 911) {
    sidebar.classList.remove('close');
    toggleButton.classList.remove('rotate');
    localStorage.setItem('sidebarClosed', 'false');
  } else if (width < 1281) {
    sidebar.classList.add('close');
    toggleButton.classList.add('rotate');
    localStorage.setItem('sidebarClosed', 'true');
  } else {
    // Restore user's last preference if above 1281px
    const isClosed = localStorage.getItem('sidebarClosed') === 'true';
    sidebar.classList.toggle('close', isClosed);
    toggleButton.classList.toggle('rotate', isClosed);
  }
}

// Disable animations initially if sidebar is closed
if (localStorage.getItem('sidebarClosed') === 'true') {
  sidebar.classList.add('close', 'no-transition');
  toggleButton.classList.add('rotate');
}

// Remove 'no-transition' after a slight delay to avoid animation on load
setTimeout(() => {
  sidebar.classList.remove('no-transition');
}, 100);

// Apply responsive sidebar logic on load
handleResponsiveSidebar();

// Listen for window resize and adjust sidebar state accordingly
window.addEventListener('resize', handleResponsiveSidebar);

function toggleSidebar() {
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');

  // Save the state in localStorage
  localStorage.setItem('sidebarClosed', sidebar.classList.contains('close'));

  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains('show')) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle('show');
  button.classList.toggle('rotate');

  if (sidebar.classList.contains('close')) {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');

    // Update localStorage since sidebar state changed
    localStorage.setItem('sidebarClosed', sidebar.classList.contains('close'));
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show');
    ul.previousElementSibling.classList.remove('rotate');
  });
}
