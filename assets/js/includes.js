(function () {
  const isLeistung = location.pathname.includes('/leistungen/');
  const prefix = isLeistung ? '../' : '';
  const headerTarget = document.getElementById('site-header');
  const footerTarget = document.getElementById('site-footer');

  function fixAssetPaths(rootEl){
    // When partial is loaded on /leistungen/*, its assets/img links need ../
    if (!isLeistung) return;
    rootEl.querySelectorAll('img[src^="assets/"]').forEach(img => {
      img.setAttribute('src', '../' + img.getAttribute('src'));
    });
    rootEl.querySelectorAll('a[href^="index.html"],a[href^="ueber-uns.html"],a[href^="dienstleistungen.html"],a[href^="partner.html"],a[href^="kontakt.html"],a[href^="impressum.html"],a[href^="datenschutz.html"]').forEach(a=>{
      a.setAttribute('href','../'+a.getAttribute('href'));
    });
  }

  async function loadPartials() {
    try {
      if (headerTarget) {
        const h = await fetch(prefix + 'partials/header.html', { cache: 'no-store' });
        headerTarget.innerHTML = await h.text();
        fixAssetPaths(headerTarget);

        // mobile menu toggle
        const btn = headerTarget.querySelector('.menu-btn');
        const nav = headerTarget.querySelector('.nav');
        if (btn && nav) {
          const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
          btn.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
          document.addEventListener('click', (e) => {
            if (!nav.classList.contains('open')) return;
            if (nav.contains(e.target) || btn.contains(e.target)) return;
            close();
          });
          document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
        }
      }

      if (footerTarget) {
        const f = await fetch(prefix + 'partials/footer.html', { cache: 'no-store' });
        footerTarget.innerHTML = await f.text();
        fixAssetPaths(footerTarget);
        const y = footerTarget.querySelector('#year');
        if (y) y.textContent = new Date().getFullYear();
      }
    } catch (e) {
      // Fail silently so content still renders
      console.warn('Includes failed', e);
    }
  }

  loadPartials();
})();