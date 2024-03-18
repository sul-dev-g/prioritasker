// Accessing elements
const toggleMenuButton = document.querySelector("#toggle-menu-button");
const toggleMenuIcon = document.querySelector("#toggle-menu-icon");
const line = document.querySelector(".line");
const getStartedBtn = document.querySelector(".get-started");
const showMobileNavLinks = document.querySelector(".show-mobile-nav-links");

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
  navLinks.classList.toggle("show-mobile-nav-links");
}
// show in overlay but not in nav
// if(window.screen.width >= 650px) {
// showMobileNavLinks display: none; else
// } else {
//
// }
// Show desktop navLinks
// Hide mobileNavLInks on screen sizes > 650px
//
