const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

// Check localStorage for sidebar state on page load
if (localStorage.getItem('sidebarClosed') === 'true') {
  sidebar.classList.add('close');
  toggleButton.classList.add('rotate');
}

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


// // Function to handle resizing and apply the required classes
// function handleResize() {
//   const viewportWidth = window.innerWidth;

//   if (viewportWidth <= 1280 && !sidebar.classList.contains('close')) {
//     sidebar.classList.add('close');
//   }

//   if (viewportWidth < 811 && sidebar.classList.contains('close')) {
//     sidebar.classList.remove('close');
//   }

//   if (viewportWidth >= 1281 && sidebar.classList.contains('close')) {
//     sidebar.classList.remove('close');
//   }
// }

// // Attach resize event listener
// window.addEventListener('resize', handleResize);

// // Call the function initially to set the correct state on page load
// handleResize();
