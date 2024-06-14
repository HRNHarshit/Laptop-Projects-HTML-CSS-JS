const num = document.querySelector(".num");
let counter = 0;
setInterval(() => {
  if (counter == 100) {
    clearInterval();
  } else {
    counter++;
    num.textContent = counter + "%";
  }
}, 80);
