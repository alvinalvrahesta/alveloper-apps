const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-site-nav]");
const header = document.querySelector(".site-header");
let lastScrollY = window.scrollY;
let headerLockUntil = 0;

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    header?.classList.toggle("is-hidden", false);
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    header?.classList.add("is-hidden");
    headerLockUntil = Date.now() + 900;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;

    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const menuIsOpen = nav?.classList.contains("is-open");

    if (currentScrollY <= 8 || menuIsOpen) {
      header.classList.remove("is-hidden");
    } else if (Date.now() < headerLockUntil || scrollingDown) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
  },
  { passive: true },
);
