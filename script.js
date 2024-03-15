const navLinks = document.querySelector(".nav-links");
const toggleMenuButton = document.querySelector("#toggle-menu-button");
const toggleMenuIcon = document.querySelector("#toggle-menu-icon");

toggleMenuButton.addEventListener("click", (event) => {
  const containsBarsIcon = toggleMenuIcon.classList.contains("fa-bars");
  const removeBarsIcon = toggleMenuIcon.classList.remove("fa-bars");
  const replaceWithCloseIcon = toggleMenuIcon.classList.add("fa-xmark");
  const removeCloseIcon = toggleMenuIcon.classList.remove("fa-xmark");
  const replaceWithBarsIcon = toggleMenuIcon.classList.add("fa-bars");

  containsBarsIcon
    ? removeBarsIcon && replaceWithCloseIcon
    : removeCloseIcon && replaceWithBarsIcon;
});
