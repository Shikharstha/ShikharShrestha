// ---- Theme toggle ----
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
if (!savedTheme) {
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
document.documentElement.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
}
if (themeToggle) {
themeToggle.addEventListener('click', () => {
const current = document.documentElement.getAttribute('data-theme');
const next = current === 'light' ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
});
}


// ---- Mobile nav (hamburger) ----
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
function setNavOpen(isOpen) {
document.documentElement.setAttribute('data-nav-open', isOpen ? 'true' : 'false');
if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
if (menuToggle && siteNav) {
menuToggle.addEventListener('click', () => {
const open = document.documentElement.getAttribute('data-nav-open') === 'true';
setNavOpen(!open);
});
// Close when clicking a link (for single-page scroll)
siteNav.addEventListener('click', (e) => {
const a = e.target.closest('a');
if (a && a.getAttribute('href')?.startsWith('#')) setNavOpen(false);
});
// Close on Escape
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') setNavOpen(false);
});
// Reset when resizing to wide screens
window.addEventListener('resize', () => {
if (window.innerWidth > 800) setNavOpen(false);
});
}


// ---- Footer timestamps ----
const yearEl = document.getElementById('year');
const lastUpdatedEl = document.getElementById('lastUpdated');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastUpdatedEl) {
lastUpdatedEl.textContent = new Date().toLocaleDateString(undefined, {
year: 'numeric', month: 'short', day: '2-digit'
});
}

// ---- Projects data ----
{
title: 'RFID + PHIS Compliance Modernization',
blurb: 'Enterprise program enabling production visibility & regulatory reporting across 10+ plants.',
tags: ['IoT','RFID','Data Platform','Compliance'],
demo: '#',
code: '#'
},
{
title: 'Portfolio Ownership Model (50+ Apps)',
blurb: 'Redesigned product ownership & capacity planning to improve delivery and reduce thrash.',
tags: ['Portfolio Mgmt','JIRA','Operating Model'],
demo: '#',
code: '#'
},
{
title: 'Flight Deal Discovery App (MVP)',
blurb: 'Perplexity-style UI with Supabase & Expo; conversational flight search & alerts.',
tags: ['React Native','Supabase','AI'],
demo: '#',
code: '#'
}
];


const grid = document.getElementById('projectsGrid');
const make = (html) => {
const t = document.createElement('template');
t.innerHTML = html.trim();
return t.content.firstChild;
};


if (grid) {
projects.forEach(p => {
const el = make(`
<article class="project card">
<div class="thumb" role="img" aria-label="Project thumbnail"></div>
<div>
<h3 style="margin:0 0 6px; font-size:18px;">${p.title}</h3>
<p class="muted" style="margin:0 0 10px;">${p.blurb}</p>
<div class="tags">${p.tags.map(t => `<span class=\"tag\">${t}</span>`).join('')}</div>
</div>
<div class="actions">
<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Live</a>
<a class="btn" href="${p.code}" target="_blank" rel="noopener">Code</a>
</div>
</article>
`);
grid.appendChild(el);
});
}
