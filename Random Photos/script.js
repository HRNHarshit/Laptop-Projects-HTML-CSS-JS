const imageContainerEl = document.querySelector(".image-container");
console.log(imageContainerEl);

const btn = document.querySelector(".btn");

btn.addEventListener("click", (event) => {
    let imgNo = 8;
    for (let i = 0; i < imgNo; i++) {
        addNewImages();
    }
});

function addNewImages() {
    const newImgEl = document.createElement("img");
    const randomNo = Math.floor(Math.random() * 20000);
    newImgEl.src = `https://picsum.photos/300?random=${randomNo}`;

    imageContainerEl.appendChild(newImgEl);
}
