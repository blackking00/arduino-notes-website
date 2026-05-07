/* =============================================
   Arduino Notes Website — main.js
   ============================================= */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Hamburger menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Tab switching ─────────────────────────────
const tabBtns  = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Remove active from all
    tabBtns.forEach(b  => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    // Add active to clicked
    btn.classList.add('active');
    const pane = document.getElementById('tab-' + target);
    if (pane) pane.classList.add('active');
  });
});

// ── Scroll reveal for topic cards ────────────
const cards = document.querySelectorAll('.topic-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

cards.forEach(card => revealObserver.observe(card));

// ── Smooth active nav link highlight ─────────
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Copy code on click ────────────────────────
document.querySelectorAll('.code-block, .code-body').forEach(block => {
  block.style.cursor = 'pointer';
  block.title = 'Click to copy code';

  block.addEventListener('click', () => {
    const text = block.innerText;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Code copy ho gaya! ✅');
    }).catch(() => {
      showToast('Copy ke liye Ctrl+C use karo');
    });
  });
});

// ── Toast notification ────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
      background: #162236; border: 1px solid rgba(0,215,255,0.25);
      color: #E8EDF5; padding: 12px 22px; border-radius: 10px;
      font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      transform: translateY(20px); opacity: 0;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  // Show
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
  });
  // Hide after 2.5s
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
  }, 2500);
}

// ── Page load animation ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
