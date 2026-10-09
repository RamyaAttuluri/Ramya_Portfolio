/* Attuluri Ramya — static portfolio interactions (no backend, no dependencies). */
(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('scroll-progress');
  const themeButton = document.getElementById('theme-toggle');
  const menuButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const toast = document.getElementById('toast');
  let toastTimeout;

  function announce(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 3300);
  }

  // Theme persists where browser storage is available.
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('ramya-portfolio-theme'); } catch (_) { /* private mode */ }
  const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : 'dark';
  setTheme(initialTheme);
  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#080c1c' : '#edf0fa';
  }
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('ramya-portfolio-theme', next); } catch (_) { /* private mode */ }
  });

  // Navigation: accessible on desktop, tablet and mobile.
  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
  menuButton.addEventListener('click', () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    menuButton.classList.toggle('is-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !header.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 680) closeMenu(); });

  let scrollScheduled = false;
  function updateScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 28);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0}%`;
    scrollScheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) { window.requestAnimationFrame(updateScroll); scrollScheduled = true; }
  }, {passive:true});
  updateScroll();

  const sections = ['about', 'skills', 'projects', 'journey', 'contact']
    .map(id => document.getElementById(id));
  const navLinks = document.querySelectorAll('.desktop-nav a');
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
        }
      });
    }, {rootMargin:'-26% 0px -64% 0px',threshold:0});
    sections.forEach(section => activeObserver.observe(section));
  }

  // Reveal only when visible; the reduced-motion CSS takes priority.
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0.08,rootMargin:'0px 0px -18px 0px'});
    reveals.forEach(element => revealObserver.observe(element));
  } else { reveals.forEach(element => element.classList.add('is-visible')); }

  // Filter cards without altering HTML or losing keyboard accessibility.
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(option => {
        const active = option === button;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
        if (!card.hidden) card.classList.add('is-visible');
      });
    });
  });

  const projects = {
    realestate: {
      type: 'APPLICATION UI · CASE STUDY', title: 'Real Estate App',
      summary: 'An application interface for property discovery and communication between tenants, landlords, and location-based agents. My work explored the frontend screens and user flows across these roles.',
      highlights: [
        'Property browsing, listing detail and property posting interfaces.',
        'Role-specific views for tenants, agents, landlords and administrators.',
        'Agent connection, messages, call and scheduled-visit experiences.',
        'Responsive layouts and thoughtful UI states for complex workflows.'
      ], tags:['Application UI','Property Listings','UX Flows'],
      note:'Application illustration is representative; a public source repository or live deployment has not been provided.'
    },
    desktop: {
      type:'DESKTOP APPLICATION · CASE STUDY', title:'Desktop Application',
      summary:'An employee and team-management desktop workspace with practical dashboards and workflow interfaces.',
      highlights:[
        'Role-sensitive dashboards and navigation for employees and managers.',
        'Leave management, leave-balance and Comp-Off tracking screens.',
        'Project boards, task views, task details and assignment interfaces.',
        'Reusable frontend components with React and Next.js in an Electron environment.'
      ],tags:['React','Next.js','Electron UI'],
      note:'Application illustration is representative; no proprietary source code or internal business information is shared.'
    },
    reviews: {
      type:'ACADEMIC PROJECT · B.TECH',title:'Fake Online Review Detection',
      summary:'My major college project explored how Natural Language Processing and machine learning can help distinguish misleading online reviews from genuine feedback.',
      highlights:[
        'Analyzed review text and patterns that may indicate misleading content.',
        'Considered sentiment and reviewer behavior as classification signals.',
        'Used machine-learning concepts to categorize genuine and fake reviews.'
      ],tags:['NLP','Machine Learning','Text Classification'],
      note:'Academic project described in my uploaded resume. No live detection API or public demo is claimed.'
    }
  };
  const dialog = document.getElementById('project-dialog');
  const closeDialog = document.getElementById('dialog-close');
  let openingElement = null;
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
    const project = projects[button.dataset.open];
    if (!project) return;
    openingElement = button;
    document.getElementById('dialog-kicker').textContent = project.type;
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-summary').textContent = project.summary;
    document.getElementById('dialog-note').textContent = project.note;
    const list = document.getElementById('dialog-highlights');
    list.replaceChildren();
    project.highlights.forEach(highlight => {
      const item = document.createElement('li');
      item.textContent = highlight;
      list.appendChild(item);
    });
    const tags = document.getElementById('dialog-tags');
    tags.replaceChildren();
    project.tags.forEach(tag => {
      const element = document.createElement('span');
      element.textContent = tag;
      tags.appendChild(element);
    });
    dialog.showModal();
    closeDialog.focus();
  }));
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => { if (openingElement) openingElement.focus(); });

  document.getElementById('copy-email').addEventListener('click', async () => {
    const value = 'attuluri03@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly','');
        field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      announce('Email address copied!');
    } catch (_) {
      announce('Copy unavailable here. Email: ' + value);
    }
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
