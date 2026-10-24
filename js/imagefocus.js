const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const closeBtn = document.querySelector('.imageClose');
const thumbnails = document.querySelectorAll('.thumbnail');

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
};

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    lightboxImg.src = thumb.src;
    lightboxTitle.textContent = thumb.closest('.image-containerNoEffect')
      .querySelector('.image-title').textContent;
    lightbox.classList.add('is-open');
  });
});

closeBtn.addEventListener('click', () => {
  closeLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg && e.target !== closeBtn && e.target !== lightboxTitle) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
