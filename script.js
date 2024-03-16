// Accessing elements
const navLinks = document.querySelector("#nav-links");
const toggleMenuButton = document.querySelector("#toggle-menu-button");
const toggleMenuIcon = document.querySelector("#toggle-menu-icon");
const line = document.querySelector(".line");

// Click hamburger event listener
toggleMenuButton.addEventListener("click", openMenu);

function openMenu() {
  // Accessing elements
  const hamburgerTopBar = document.querySelector(".top-bar");
  const hamburgerMiddleBar = document.querySelector(".middle-bar");
  const hamburgerBottomBar = document.querySelector(".bottom-bar");

  // Turn hamburger into an X
  hamburgerTopBar.classList.toggle("rotate-45");
  hamburgerMiddleBar.classList.toggle("opacity-0");
  hamburgerBottomBar.classList.toggle("rotate-315");
  hamburgerBottomBar.classList.toggle("center-vertically");
  hamburgerTopBar.classList.toggle("center-vertically");
}

// // const lineBefore = window.getComputedStyle(line, "::before");
// const lineAfter = window.getComputedStyle(line, ":after");
// const containsBarsIcon = toggleMenuIcon.classList.contains("fa-bars");
// const removeBarsIcon = toggleMenuIcon.classList.remove("fa-bars");
// const replaceWithCloseIcon = toggleMenuIcon.classList.add("fa-xmark");
// const removeCloseIcon = toggleMenuIcon.classList.remove("fa-xmark");
// const replaceWithBarsIcon = toggleMenuIcon.classList.add("fa-bars");

// containsBarsIcon
//   ? removeBarsIcon && replaceWithCloseIcon
//   : removeCloseIcon && replaceWithBarsIcon;
// target issue maybe you need to use target on the toggleMenuButton or toggleMenuIcon because maybe the browser can't distinguish between what is being clicked or maybe z index will work
