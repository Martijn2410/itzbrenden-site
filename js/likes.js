const STORAGE_KEY = "likedPosts";

function initLikes() {
  const likedPosts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  document.querySelectorAll(".like-button").forEach((button) => {
    const postId = button.dataset.postId;

    if (likedPosts[postId]) {
      button.classList.add("liked");
    }

    button.addEventListener("click", () => {
      const isLiked = button.classList.toggle("liked");
      likedPosts[postId] = isLiked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedPosts));
    });
  });
}