(() => {
  const base = window.location.pathname.startsWith("/begogmbh.de") ? "/begogmbh.de" : "";

  const load = async (name) => {
    const res = await fetch(`${base}/partials/${name}.html`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Include ${name} not found (${res.status})`);
    return await res.text();
  };

  const initMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const drawer = document.getElementById("site-drawer");
    if (!toggle || !drawer) return;

    const closeEls = drawer.querySelectorAll("[data-menu-close]");

    const close = () => {
      drawer.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    const open = () => {
      drawer.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      drawer.hidden ? open() : close();
    });

    closeEls.forEach(el => el.addEventListener("click", (e) => { e.preventDefault(); close(); }));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const headerHost = document.querySelector("[data-include='header']");
    const footerHost = document.querySelector("[data-include='footer']");

    try {
      if (headerHost) headerHost.innerHTML = await load("header");
      if (footerHost) footerHost.innerHTML = await load("footer");
      initMenu();
    } catch (err) {
      console.error(err);
    }
  });
})();
