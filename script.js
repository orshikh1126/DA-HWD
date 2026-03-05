onload = () => {
  document.body.classList.remove("container");

  // AUTO OPEN SEQUENCE
  mysteryBtn.style.display = "none";     // hide button
  wrapper.style.display = "flex";        // show envelope

  wrapper.style.opacity = "0";
  setTimeout(() => {
    wrapper.style.transition = "opacity 0.5s ease";
    wrapper.style.opacity = "1";
  }, 10);

  // open envelope automatically
  setTimeout(() => {
    wrapper.classList.add("open");
  }, 1500);
};

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

const posterImg = document.getElementById("posterImg");     
const posterViewer = document.getElementById("posterViewer"); 
const posterLarge = document.getElementById("posterLarge");
const posterClose = document.getElementById("posterClose");

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
