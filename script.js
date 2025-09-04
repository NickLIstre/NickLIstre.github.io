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
  const goingDark = !document.body.classList.contains("dark");
  document.body.classList.toggle("dark");

  // Update icon
  toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";

  if (goingDark) {
    for (let i = 0; i < 10; i++) {
      createShootingStar();
    }
  } else {
    createSunburst();
  }
});

function createShootingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  // Random starting position in the top half of screen
  star.style.top = `${Math.random() * 50}%`;
  star.style.left = `${Math.random() * 80}%`;

  star.style.animationDelay = `${Math.random() * 0.4}s`;

  const xTravel = 200 + Math.random() * 200;
  const yTravel = 100 + Math.random() * 200;
  star.style.setProperty("--xTravel", `${xTravel}px`);
  star.style.setProperty("--yTravel", `${yTravel}px`);

  document.body.appendChild(star);

  star.addEventListener("animationend", () => star.remove());
}

function createSunburst() {
  const burst = document.createElement("div");
  burst.classList.add("sunburst");

  // Get the theme-toggle button's position
  const btn = document.getElementById("theme-toggle");
  const rect = btn.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  // Set burst position
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(burst);

  // Remove after animation
  burst.addEventListener("animationend", () => burst.remove());
}

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
