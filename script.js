document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// Dark mode toggle
const toggle = document.createElement("button");
toggle.id = "theme-toggle";
toggle.textContent = "☀️";
const header = document.querySelector("header"); 
header.appendChild(toggle);
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ?  "🌙": "☀️";
});

// Image gallery
let currentIndex = 0;
const galleryImg = document.getElementById("gallery-img");
galleryImg.src = images[currentIndex];
document.querySelector(".arrow.left").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  galleryImg.src = images[currentIndex];
});
document.querySelector(".arrow.right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  galleryImg.src = images[currentIndex];
});
