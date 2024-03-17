// Accessing elements
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
  const navLinks = document.querySelector("#nav-links");

  // Turn hamburger into an X
  hamburgerTopBar.classList.toggle("rotate-45");
  hamburgerMiddleBar.classList.toggle("opacity-0");
  hamburgerBottomBar.classList.toggle("rotate-315");
  hamburgerBottomBar.classList.toggle("center-vertically");
  hamburgerTopBar.classList.toggle("center-vertically");

  // Show nav links
  navLinks.classList.toggle("hide");
}
