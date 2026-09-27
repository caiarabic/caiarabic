const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const verb = document.querySelector('.verb');
const verbMeaning = document.querySelector('.verb-meaning');
if (verb && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = verb.dataset.words.split('|');
  const meanings = verb.dataset.meanings.split('|');
  let index = 0;
  setInterval(() => {
    verb.classList.add('swap');
    setTimeout(() => {
      index = (index + 1) % words.length;
      verb.textContent = words[index];
      verbMeaning.textContent = meanings[index];
      verb.classList.remove('swap');
    }, 400);
  }, 2600);
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const siteHeader = document.querySelector('.site-header');
const updateHeader = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Placeholder links (social profiles, review link) stay inert until real URLs are added.
document.querySelectorAll('a[data-placeholder]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

// Show the highest-rated Google reviews first.
const reviewList = document.querySelector('.review-list');
if (reviewList) {
  [...reviewList.querySelectorAll('.review-card')]
    .sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating))
    .forEach((card) => reviewList.appendChild(card));
}
