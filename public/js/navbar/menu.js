const open = document.querySelector(".header__hamburger");
const close = document.querySelector(".btn_close");
const container = document.querySelector(".sidebar_menu_mobile");
const overlay = document.querySelector(".overlay");

open.addEventListener("click", () => {
  container.classList.add("show-nav");
  overlay.classList.add("show-nav");
});

close.addEventListener("click", () => {
  container.classList.remove("show-nav");
  overlay.classList.remove("show-nav");
});
