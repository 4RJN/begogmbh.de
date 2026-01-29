(() => {
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');

  if (!btn || !nav) return;

  const isOpen = () => nav.classList.contains('open');

  const openMenu = () => {
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // Close when clicking outside the nav/button
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    const target = e.target;
    if (nav.contains(target) || btn.contains(target)) return;
    closeMenu();
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  // Close when a nav link is clicked (useful on mobile)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && isOpen()) closeMenu();
  });
})();
