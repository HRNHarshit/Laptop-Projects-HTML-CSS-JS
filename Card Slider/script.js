const slider = document.querySelector(".slider");

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const indicators = document.querySelector(".controls ul");
const list = document.querySelectorAll(".controls li");

var sectionIndex = 0;

const setIndex = (index) => {
  document.querySelector(".controls .selected").classList.remove("selected");
  slider.style.transform = `translate(-${index * 25}%)`;
};

list.forEach((item, inx) => {
  item.addEventListener("click", () => {
    sectionIndex = inx;
    setIndex(inx);
    item.classList.add("selected");
  });
});

leftArrow.addEventListener("click", () => {
  sectionIndex = sectionIndex > 0 ? sectionIndex - 1 : 3;
  setIndex(sectionIndex);
  indicators.children[sectionIndex].classList.add("selected");
});

rightArrow.addEventListener("click", () => {
  sectionIndex = (sectionIndex + 1) % 4;
  setIndex(sectionIndex);
  indicators.children[sectionIndex].classList.add("selected");
});
