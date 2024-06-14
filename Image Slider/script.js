const prevEl = document.querySelector(".prev");
const nextEl = document.querySelector(".next");
const imgContainerEl = document.querySelector(".image-container");
const imgEl = document.querySelectorAll("img");

let currentImg = 1;
let timeout;

nextEl.addEventListener("click", () => {
    currentImg++;
    clearTimeout(timeout);
    updateImg();
});

prevEl.addEventListener("click", () => {
    currentImg--;
    clearTimeout(timeout);
    updateImg();
});

const updateImg = () => {
    if (currentImg > imgEl.length) {
        currentImg = 1;
    } else if (currentImg < 1) {
        currentImg = imgEl.length;
    }
    let imgNo = -500 * (currentImg - 1);
    imgContainerEl.style.transform = `translate(${imgNo}px)`;

    timeout = setTimeout(() => {
        currentImg++;
        updateImg();
    }, 3000);
};

updateImg();
