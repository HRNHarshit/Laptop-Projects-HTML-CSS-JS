// Game Constants & Variables
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let inputDir = { x: 0, y: 0 };
let speed = 5+6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 2, y: 2 }];
let food = { x: 6, y: 10 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // IF you bnump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //If you bump into the wall
    if (
        snake[0].x >= 20 ||
        snake[0].x <= 0 ||
        snake[0].y >= 20 ||
        snake[0].y <= 0
    ) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array and Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 2, y: 2 }];
        score = 0;
        musicSound.play();
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreVal) {
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            const hiScoreBox = document.getElementById("hiScoreBox");
            hiScoreBox.innerHTML = "Hi Score: " + hiscoreVal;
        }
        scoreBox.innerHTML = `Score: ${score}`;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y,
        });
        let [a, b] = [2, 18];
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Render the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display the Food
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    var hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
} else {
    hiscoreVal = JSON.parse(hiscore);
    const hiScoreBox = document.getElementById("hiScoreBox");
    hiScoreBox.innerHTML = "Hi Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    // Start the game
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
