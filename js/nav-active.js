const navbar = document.querySelector(".navbar");

if (navbar) {
  const currentPath = window.location.pathname.split("/").pop();
  const currentPage = currentPath && currentPath.length > 0 ? currentPath : "index.html";

  // Subpages under OC Projects should keep the OC Projects tab highlighted.
  const activePageMap = {
    "ocstories.html": "projects.html",
    "sidestories.html": "projects.html",
    "oc-projects.html": "projects.html",
    "game-projects.html": "projects.html"
  };

  const pageToHighlight = activePageMap[currentPage] || currentPage;
  const navLinks = navbar.querySelectorAll("a[href]");

  const matchingLinks = Array.from(navLinks).filter((link) => {
    const rawHref = link.getAttribute("href") || "";
    const resolvedPath = new URL(rawHref || window.location.href, window.location.href).pathname;
    const linkPage = resolvedPath.split("/").pop() || "index.html";

    return linkPage === pageToHighlight;
  });

  navLinks.forEach((link) => {
    link.classList.remove("nav-active");
    link.removeAttribute("aria-current");
  });

  // Game Projects and OC Projects currently share projects.html. The latter
  // is the section represented by that page, so use the last matching link.
  const activeLink = matchingLinks[matchingLinks.length - 1];
  if (activeLink) {
    activeLink.classList.add("nav-active");
    activeLink.setAttribute("aria-current", "page");
  }
}