const btn = document.querySelector(".btn");
const likeValue = document.querySelector(".like_value");
let val = likeValue.textContent;

btn.addEventListener("click", () => {
  btn.classList.remove("fa-regular");
  btn.classList.add("fa-solid");
});
