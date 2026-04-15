const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const revealElements = document.querySelectorAll('.reveal');
const heatmap = document.getElementById('heatmap');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Build the GitHub-style contribution grid.
if (heatmap) {
  const cells = 126;
  for (let i = 0; i < cells; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';
    const level = (i * 7 + (i % 5) * 3) % 5;
    const shades = [
      'rgba(148, 163, 184, 0.14)',
      'rgba(148, 163, 184, 0.26)',
      'rgba(56, 189, 248, 0.34)',
      'rgba(139, 92, 246, 0.44)',
      'rgba(167, 139, 250, 0.62)'
    ];
    cell.style.background = shades[level];
    heatmap.appendChild(cell);
  }
}

// Mobile nav toggle.
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal sections as they enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));

// Highlight the current nav section on scroll.
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = Array.from(navAnchors)
  .map((anchor) => document.querySelector(anchor.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((anchor) => {
          anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
);

sections.forEach((section) => sectionObserver.observe(section));

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('message')?.value.trim() || '';
    const encodedMessage = encodeURIComponent(`Hi Akash, I visited your portfolio and would like to connect.\n\n${message}`);
    window.open(`https://wa.me/916203401694?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    formStatus.textContent = 'Opening WhatsApp with your message...';
    contactForm.reset();
  });
}
