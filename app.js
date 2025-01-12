const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

// Function to handle resizing and apply the required classes
function handleResize() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth <= 1270 && !sidebar.classList.contains('close')) {
    sidebar.classList.add('close');
  }

  if (viewportWidth < 811 && sidebar.classList.contains('close')) {
    sidebar.classList.remove('close');
  }

  if (viewportWidth >= 1271 && sidebar.classList.contains('close')) {
    sidebar.classList.remove('close');
  }
}

// Attach resize event listener
window.addEventListener('resize', handleResize);

// Call the function initially to set the correct state on page load
handleResize();