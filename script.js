// Portfolio lightbox
const portfolioImages = document.querySelectorAll(".portfolio-image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightboxButton = document.getElementById("close-lightbox");

portfolioImages.forEach((image) => {
  image.addEventListener("click", () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

closeLightboxButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach((element) => revealObserver.observe(element));

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const open = navLinks.classList.contains("active");
  menuToggle.textContent = open ? "✕" : "☰";
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("active");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-label", "Open menu");
}));

// Rotating hero background
const heroPhotos = [
  "hero.jpg",
  "citytat.JPG",
  "dice.jpg",
  "IMG_6995.jpg",
  "madusa.JPG",
  "3facetat.jpg",
  "tatclown.jpg",
  "tatcross.jpg"
];

const heroLayers = [document.querySelector(".hero-bg-a"), document.querySelector(".hero-bg-b")];
let currentPhoto = 0;
let activeLayer = 0;

heroLayers[0].style.backgroundImage = `url("${heroPhotos[0]}")`;
heroLayers[0].classList.add("active");

// Preload for smoother fades
heroPhotos.forEach((src) => { const img = new Image(); img.src = src; });

setInterval(() => {
  currentPhoto = (currentPhoto + 1) % heroPhotos.length;
  const nextLayer = 1 - activeLayer;
  heroLayers[nextLayer].style.backgroundImage = `url("${heroPhotos[currentPhoto]}")`;
  heroLayers[nextLayer].classList.add("active");
  heroLayers[activeLayer].classList.remove("active");
  activeLayer = nextLayer;
}, 5000);
