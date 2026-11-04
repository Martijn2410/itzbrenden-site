const header = document.querySelector(".portfolio-page .header, .about-page .header");

// We removed the static artItems query and length check here
if (header) {
  const desktopQuery = window.matchMedia("(min-width: 911px)");

  const updateHeaderState = () => {
    if (!desktopQuery.matches) {
      header.classList.remove("is-overlapping");
      return;
    }

    // Move the query INSIDE the update function so it finds dynamically added images
    const artItems = document.querySelectorAll(".portfolio-page .image-containerNoEffect, .about-page .container");
    
    if (artItems.length === 0) return;

    const headerRect = header.getBoundingClientRect();
    const headerBottom = headerRect.bottom;
    const headerTop = headerRect.top;

    const isAnyItemBehindHeader = Array.from(artItems).some((item) => {
      const rect = item.getBoundingClientRect();
      return rect.top < headerBottom && rect.bottom > headerTop;
    });

    header.classList.toggle("is-overlapping", isAnyItemBehindHeader);
  };

  let ticking = false;

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateHeaderState();
      ticking = false;
    });
  };

  updateHeaderState();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  desktopQuery.addEventListener("change", requestUpdate);
}