const navbarEl = document.querySelector(".navbar");
const bottomContainerEl = document.querySelector(".bottom-container");
console.log(bottomContainerEl.offsetHeight);

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  if (window.scrollY > bottomContainerEl.offsetTop - navbarEl.offsetHeight - 50 /*Margin*/) {
    navbarEl.classList.add("active");
  } else {
    navbarEl.classList.remove("active");
  }
});
