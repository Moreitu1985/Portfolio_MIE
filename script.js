/* 1 ─── SCROLL PROGRESS BAR */
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = pct + '%';
});

/* 2 ─── NAV SHADOW ON SCROLL */
const desktopNav = document.getElementById('desktop-nav');
window.addEventListener('scroll', () => {
  desktopNav.classList.toggle('scrolled', window.scrollY > 10);
});

/* 3 ─── HAMBURGER MENU */
const hamburgerIcon = document.getElementById('hamburgerIcon');
const menuLinks     = document.getElementById('menuLinks');

function toggleMenu() {
  const isOpen = menuLinks.classList.toggle('open');
  hamburgerIcon.classList.toggle('open', isOpen);
}
hamburgerIcon.addEventListener('click', toggleMenu);
menuLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuLinks.classList.remove('open');
    hamburgerIcon.classList.remove('open');
  });
});

/* 4 ─── ACTIVE NAV LINK */
const allSections  = document.querySelectorAll('section[id]');
const allNavLinks  = document.querySelectorAll('#desktop-nav .nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  allNavLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* 5 ─── SCROLL REVEAL */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* 6 ─── HERO PHOTO UPLOAD */
document.getElementById('heroInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('heroPhoto').src = e.target.result;
    document.querySelector('.photo-hint').textContent = '✓ Photo updated — click 📷 to change';
  };
  reader.readAsDataURL(file);
});

/* 7 ─── ABOUT PHOTO UPLOAD */
document.getElementById('aboutInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => { document.getElementById('aboutPhoto').src = e.target.result; };
  reader.readAsDataURL(file);
});

/* 8 ─── YOUTUBE MODAL */
const ytModal    = document.getElementById('ytModal');
const ytFrame    = document.getElementById('ytFrame');
const ytClose    = document.getElementById('ytClose');
const ytBackdrop = document.getElementById('ytBackdrop');

function openYT(id) {
  ytFrame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
  ytModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeYT() {
  ytFrame.src = '';
  ytModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.yt-facade').forEach(el => {
  el.addEventListener('click', () => { if (el.dataset.vid) openYT(el.dataset.vid); });
});
ytClose.addEventListener('click', closeYT);
ytBackdrop.addEventListener('click', closeYT);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeYT(); });

/* 9 ─── PROJECT FILTER TABS */
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('[data-cat]').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && !(card.dataset.cat || '').includes(filter));
    });
  });
});

/* 10 ─── CONTACT FORM VALIDATION */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const rules = [
    { id: 'fn',  err: 'fn-err',  test: v => v.trim().length > 0 },
    { id: 'em',  err: 'em-err',  test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'sub', err: 'sub-err', test: v => v.trim().length > 0 },
    { id: 'msg', err: 'msg-err', test: v => v.trim().length >= 10 },
  ];

  rules.forEach(r => {
    const el  = document.getElementById(r.id);
    const err = document.getElementById(r.err);
    const ok  = r.test(el.value);
    err.classList.toggle('show', !ok);
    el.style.borderColor = ok ? '' : '#dc2626';
    if (!ok) valid = false;
  });

  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    this.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message →';
    document.querySelectorAll('.fg input, .fg textarea').forEach(el => el.style.borderColor = '');
    const ok = document.getElementById('formOk');
    ok.classList.add('show');
    setTimeout(() => ok.classList.remove('show'), 6000);
  }, 1500);
});

// Clear field errors on input
document.querySelectorAll('.fg input, .fg textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.style.borderColor = '';
    const err = document.getElementById(el.id + '-err');
    if (err) err.classList.remove('show');
  });
});


//GAMER
function openGamerModal() {
  document.getElementById("gamerModal").classList.add("open");
}

function closeGamerModal() {
  document.getElementById("gamerModal").classList.remove("open");
}