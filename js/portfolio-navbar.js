const header = document.querySelector(".portfolio-page .header, .about-page .header");
const artItems = document.querySelectorAll(".portfolio-page .image-containerNoEffect, .about-page .container");

if (header && artItems.length > 0) {
  const desktopQuery = window.matchMedia("(min-width: 911px)");

  const updateHeaderState = () => {
    if (!desktopQuery.matches) {
      header.classList.remove("is-overlapping");
      return;
    }

    const headerBottom = header.getBoundingClientRect().bottom;
    const isAnyItemBehindHeader = Array.from(artItems).some((item) => {
      const rect = item.getBoundingClientRect();
      return rect.top < headerBottom && rect.bottom > header.getBoundingClientRect().top;
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