// DOM elements
const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const buttons = document.querySelectorAll("button");
let currentStep = 1;

// function that updates the current step and updates the DOM
const updateSteps = (event) => {
  // update current step based on the button clicked
  currentStep = event.target.id === "next" ? ++currentStep : --currentStep;
  console.log(currentStep);

  // loop through all circles and add/remove 'active' class based on their index and current step
  circles.forEach((circle, index) => {
    circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
  });

  // update progree bar width based on current step
  progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;

  // check if current step is last step or first step and disable corresponding buttons
  if (currentStep === circles.length) {
    buttons[1].disabled = true;
  } else if (currentStep === 1) {
    buttons[0].disabled = true;
  } else {
    buttons.forEach((button) => (button.disabled = false));
  }
};

// add click event listners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", updateSteps);
});
