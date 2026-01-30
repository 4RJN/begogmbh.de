(() => {
  const detectBase = () => {
    // Works for: https://4rjn.github.io/begogmbh.de/...
    const m = window.location.pathname.match(/^(\/[^\/]+)\//);
    // If repo is served under /begogmbh.de, use it; otherwise empty
    return window.location.pathname.startsWith("/begogmbh.de/") ? "/begogmbh.de" : "";
  };

  const base = detectBase();

  const load = async (name) => {
    const res = await fetch(`${base}/partials/${name}.html`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Include ${name} not found (${res.status})`);
    return await res.text();
  };

  const initMenu = () => {
    const btn = document.querySelector(".menu-toggle");
    const nav = document.getElementById("site-nav");
    if (!btn || !nav) return;

    const close = () => {
      nav.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      nav.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    };

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      (nav.hidden ? open : close)();
    });

    document.addEventListener("click", (e) => {
      if (nav.hidden) return;
      if (e.target === btn || btn.contains(e.target) || nav.contains(e.target)) return;
      close();
    });

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
