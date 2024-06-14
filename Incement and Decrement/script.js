const num = document.querySelector(".num");
const incrementButton = document.querySelector(".inc");
const decrementButton = document.querySelector(".dec");

let x = 0;
incrementButton.addEventListener("click", () => {
  x++;
  if (x > 1) decrementButton.style.cursor = "pointer";
  x = x < 10 ? "0" + x : x;
  num.textContent = x;
});

decrementButton.addEventListener("click", () => {
  if (x > 1) {
    x--;
    x = x < 10 ? "0" + x : x;
    num.textContent = x;
    if (x == 1) decrementButton.style.cursor = "no-drop";
  }
});
