const navbar = document.querySelector(".navbar");

if (navbar) {
  const currentPath = window.location.pathname.split("/").pop();
  const currentPage = currentPath && currentPath.length > 0 ? currentPath : "index.html";

  // Subpages under OC Projects should keep the OC Projects tab highlighted.
  const activePageMap = {
    "ocstories.html": "projects.html",
    "sidestories.html": "projects.html"
  };

  const pageToHighlight = activePageMap[currentPage] || currentPage;
  const navLinks = navbar.querySelectorAll("a[href]");

  navLinks.forEach((link) => {
    link.classList.remove("nav-active");
    link.removeAttribute("aria-current");

    const rawHref = link.getAttribute("href") || "";
    const resolvedPath = new URL(rawHref || window.location.href, window.location.href).pathname;
    const linkPage = resolvedPath.split("/").pop() || "index.html";

    if (linkPage === pageToHighlight) {
      link.classList.add("nav-active");
      link.setAttribute("aria-current", "page");
    }
  });
}