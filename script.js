window.onload = () => {
  document.body.classList.remove("container");
};

const wrapper = document.querySelector(".wrapper");
const mysteryBtn = document.getElementById("mysteryBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

if (mysteryBtn && wrapper) {
  mysteryBtn.addEventListener("click", () => {
    mysteryBtn.style.display = "none";
    wrapper.style.display = "flex";
    const buttons = document.querySelector(".buttons");
    if (buttons) buttons.style.display = "block";

    wrapper.style.opacity = "0";
    setTimeout(() => {
      wrapper.style.transition = "opacity 0.5s ease";
      wrapper.style.opacity = "1";
    }, 10);
  });
}

// ===== Images =====
const galleryImages = [
  "Poster.png",
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg"
];

let currentImageIndex = 0;
let swapTimer = null;

// Letter image
const letterImg = document.getElementById("letterImg");

// Fullscreen viewer
const posterViewer = document.getElementById("posterViewer");
const posterLarge = document.getElementById("posterLarge");
const posterClose = document.getElementById("posterClose");
const posterPrev = document.getElementById("posterPrev");
const posterNext = document.getElementById("posterNext");

// Optional buttons under envelope
const prevPhotoBtn = document.getElementById("prevPhoto");
const nextPhotoBtn = document.getElementById("nextPhoto");

function renderImages() {
  const src = galleryImages[currentImageIndex];
  if (letterImg) letterImg.src = src;
  if (posterLarge) posterLarge.src = src;
}

function startAutoSwap() {
  if (swapTimer) return; // prevent multiple intervals
  swapTimer = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    renderImages();
  }, 3000);
}

function stopAutoSwap() {
  if (!swapTimer) return;
  clearInterval(swapTimer);
  swapTimer = null;
}

function openViewer() {
  if (!posterViewer) return;
  renderImages();
  posterViewer.classList.add("show");
}

function closeViewer() {
  if (!posterViewer) return;
  posterViewer.classList.remove("show");
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  renderImages();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  renderImages();
}

// init first image
renderImages();

// ===== Envelope open/close =====
if (openBtn && closeBtn && wrapper) {
  openBtn.addEventListener("click", () => {
    wrapper.classList.add("open");
    openBtn.style.display = "none";
    closeBtn.style.display = "inline-block";

    // a bit slower / nicer: wait then open fullscreen + start slideshow
    setTimeout(() => {
      openViewer();
      startAutoSwap();
    }, 900);
  });

  closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("open");
    closeBtn.style.display = "none";
    openBtn.style.display = "inline-block";

    closeViewer();
    stopAutoSwap();
  });
}

// ===== Viewer controls =====
if (posterClose) {
  posterClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeViewer();
  });
}
if (posterPrev) posterPrev.addEventListener("click", (e) => { e.stopPropagation(); prevImage(); });
if (posterNext) posterNext.addEventListener("click", (e) => { e.stopPropagation(); nextImage(); });

if (posterViewer) {
  posterViewer.addEventListener("click", (e) => {
    if (e.target === posterViewer) closeViewer();
  });
}

document.addEventListener("keydown", (e) => {
  if (!posterViewer || !posterViewer.classList.contains("show")) return;

  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "ArrowRight") nextImage();
});

// ===== Optional buttons under envelope =====
if (prevPhotoBtn) prevPhotoBtn.addEventListener("click", prevImage);
if (nextPhotoBtn) nextPhotoBtn.addEventListener("click", nextImage);