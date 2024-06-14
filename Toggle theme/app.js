const buttonEl = document.querySelector(".toggle-theme");
const bodyEl = document.body;

buttonEl.addEventListener("click", () => {
  if (bodyEl.classList.contains("dark-mode")) {
    bodyEl.classList.remove("dark-mode");
    buttonEl.textContent = "Dark Mode";
  } else {
    bodyEl.classList.add("dark-mode");
    buttonEl.textContent = "Light Mode";
  }
});
