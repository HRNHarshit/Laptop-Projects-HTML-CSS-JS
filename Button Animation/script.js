const cart = document.querySelector(".cart");
const loading = document.querySelector(".loading");
const done = document.querySelector(".done");

cart.addEventListener("click", () => {
  cart.classList.add("none");
  loading.style.cursor = "wait";
  loading.classList.remove("none");

  setTimeout(() => {
    loading.classList.add("none");
    done.classList.remove("none");
  }, 5000);
});
