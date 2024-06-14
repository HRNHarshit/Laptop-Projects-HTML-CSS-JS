const containerEl = document.querySelector(".container");
const carriers = ["Student", "Web Developer", "Freelancer", "Anime Lover"];
let aORan = "a";
let index = 0;
let charIndex = 1;

const updateText = () => {
    charIndex++;
    containerEl.innerHTML = `<h1>I am ${aORan} ${carriers[index].slice(0, charIndex)}</h1>`;
    if (charIndex === carriers[index].length) {
        index++;
        charIndex = 0;
        if (index === carriers.length) {
            index = 0;
        }
        if (carriers[index][0] === "A") {
            aORan = "an";
        } else {
            aORan = "a";
        }
    }
    setTimeout(() => updateText(), 250);
};

updateText();
