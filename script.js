onload = () => {
  document.body.classList.remove("container");
};

const wrapper = document.querySelector(".wrapper");
const mysteryBtn = document.getElementById("mysteryBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

mysteryBtn.addEventListener("click", () => {
  mysteryBtn.style.display = "none";
  wrapper.style.display = "flex";
  document.querySelector(".buttons").style.display = "block";

  wrapper.style.opacity = "0";
  setTimeout(() => {
    wrapper.style.transition = "opacity 0.5s ease";
    wrapper.style.opacity = "1";
  }, 10);
});

openBtn.addEventListener("click", () => {
  wrapper.classList.add("open");
  openBtn.style.display = "none";
  closeBtn.style.display = "inline-block";
});

closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("open");
  closeBtn.style.display = "none";
  openBtn.style.display = "inline-block";
});

/* ---------- Poster fullscreen viewer (ONLY ONE VERSION) ---------- */
const posterImg = document.getElementById("posterImg");     // the small image inside letter
const posterViewer = document.getElementById("posterViewer"); // fullscreen overlay (must be at end of body)
const posterLarge = document.getElementById("posterLarge"); // large img inside overlay
const posterClose = document.getElementById("posterClose"); // close button inside overlay

if (posterImg && posterViewer && posterLarge && posterClose) {
  posterImg.addEventListener("click", () => {
    posterLarge.src = "Poster.png";
    posterViewer.classList.add("show");
  });

  posterClose.addEventListener("click", () => {
    posterViewer.classList.remove("show");
  });

  posterViewer.addEventListener("click", (e) => {
    if (e.target === posterViewer) posterViewer.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") posterViewer.classList.remove("show");
  });
}