// Replace with your GitHub username, repository name, and image directory path
const GITHUB_USERNAME = "Martijn2410";
const GITHUB_REPO = "itzbrenden-site";
const FOLDER_PATH = "img/artPortfolio";

const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FOLDER_PATH}`;

// Cache settings: 60 minutes in milliseconds
const CACHE_DURATION = 60 * 60 * 1000; 
const CACHE_KEY = "portfolioImageData";
const CACHE_TIME_KEY = "portfolioImageFetchTime";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("portfolio-grid");
  if (!container) return;

  const cachedData = localStorage.getItem(CACHE_KEY);
  const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
  const currentTime = Date.now();

  // Check if we have cached data AND if it's less than an hour old
  if (cachedData && cacheTime && (currentTime - parseInt(cacheTime) < CACHE_DURATION)) {
    console.log("Loading portfolio from local cache...");
    const files = JSON.parse(cachedData);
    processAndRenderFiles(files, container);
  } else {
    console.log("Fetching fresh portfolio from GitHub...");
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((files) => {
        // Save the successful response and the current time to localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify(files));
        localStorage.setItem(CACHE_TIME_KEY, currentTime.toString());
        
        processAndRenderFiles(files, container);
      })
      .catch((err) => {
        console.error("Could not fetch repo images:", err);
        // Fallback: If GitHub rate limits us but we have expired cache, show it anyway
        if (cachedData) {
            console.log("Falling back to expired cache due to fetch error.");
            processAndRenderFiles(JSON.parse(cachedData), container);
        }
      });
  }
});

function processAndRenderFiles(files, container) {
  // Filter for standard image formats
  const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
  const images = files.filter((file) =>
    validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
  );

  renderGallery(images, container);

  // Re-initialize like state and lightbox clicks once DOM elements exist[cite: 14, 15]
  if (typeof initLikes === "function") initLikes();
  if (typeof initLightbox === "function") initLightbox();
}

function cleanTitle(filename) {
  // Removes extension, replaces dashes/underscores with spaces
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function renderGallery(images, container) {
  const fragment = document.createDocumentFragment();

  images.forEach((imgObj) => {
    const rawName = imgObj.name;
    const formattedTitle = cleanTitle(rawName);
    const postId = "post-" + rawName.replace(/[^a-zA-Z0-9]/g, "");

    // Exact card container required by portfolio styling[cite: 12, 16]
    const card = document.createElement("div");
    card.className = "image-containerNoEffect unselectable";

    // Like button
    const likeBtn = document.createElement("button");
    likeBtn.className = "image-container-button like-button unselectable";
    likeBtn.dataset.postId = postId;
    likeBtn.setAttribute("aria-label", "Like post");
    likeBtn.innerHTML = '<span class="material-symbols-outlined">thumb_up</span>';
    card.appendChild(likeBtn);

    // Download button pointing to the image file
    const dlLink = document.createElement("a");
    dlLink.href = imgObj.download_url || imgObj.path;
    dlLink.target = "_blank";
    dlLink.download = rawName;
    dlLink.className = "image-container-download unselectable";
    dlLink.setAttribute("aria-label", "Download image");
    dlLink.innerHTML = '<span class="material-symbols-outlined">download</span>';
    card.appendChild(dlLink);

    // Thumbnail with skeleton loader[cite: 13, 16]
    const img = document.createElement("img");
    img.className = "thumbnail skeleton";
    img.src = imgObj.path; // Relative path works directly on GitHub Pages
    img.alt = formattedTitle;
    img.loading = "lazy";
    img.decoding = "async";

    // Remove skeleton styling once the image bytes are ready[cite: 13, 16]
    img.addEventListener("load", () => img.classList.remove("skeleton"));
    card.appendChild(img);

    // Title label[cite: 12, 16]
    const titleDiv = document.createElement("div");
    titleDiv.className = "image-title";
    titleDiv.textContent = formattedTitle;
    card.appendChild(titleDiv);

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}