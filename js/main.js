// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.textContent = isOpen ? '✕' : '☰';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.textContent = '☰';
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== toggle) {
      navLinks.classList.remove('open');
      toggle.textContent = '☰';
      document.body.style.overflow = '';
    }
  });
}

// Active nav link on scroll (single-page only)
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navAnchors.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -65% 0px' });

  sections.forEach(s => observer.observe(s));
}

// Text scramble — character cycling effect (like thinkingmachines.ai)
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const length = newText.length;
    const promise = new Promise(resolve => { this.resolve = resolve; });
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const to = newText[i];
      const start = Math.floor(i * 1.5);
      const end = start + Math.floor(Math.random() * 12) + 6;
      this.queue.push({ to, start, end, char: '' });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.3) {
          char = to === ' ' ? ' ' : this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += '<span class="scramble-char">&nbsp;</span>';
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.el.innerHTML = this.queue.map(q => q.to).join('');
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Apply scramble to hero h1 on load
const scrambleEl = document.querySelector('[data-scramble]');
if (scrambleEl) {
  const text = scrambleEl.textContent.trim();
  scrambleEl.textContent = '';
  const fx = new TextScramble(scrambleEl);
  setTimeout(() => fx.setText(text), 200);
}
