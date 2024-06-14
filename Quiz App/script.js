const quizData = [
    {
        question: "Who is Virat Kholi?",
        a: "Footballer",
        b: "Cricketer",
        c: "Actor",
        d: "None",
        correct: "b",
    },
    {
        question: "What is the currency of Japan",
        a: "Rupees",
        b: "Won",
        c: "Yen",
        d: "Yuan",
        correct: "c",
    },
    {
        question: "What is best Anime in 2023?",
        a: "One Piece",
        b: "Demon Slayer",
        c: "Tokyo Revenge S2",
        d: "Jujutsu Kaisen",
        correct: "a",
    },
    {
        question: "What is the best programming language?",
        a: "C++",
        b: "Java",
        c: "Python",
        d: "JavaScript",
        correct: "b",
    },
    {
        question: "Which language is most important in Web Development?",
        a: "HTML",
        b: "JavaScript",
        c: "CSS",
        d: "React.js",
        correct: "a",
    },
    {
        question: "What year was Covid-19 released? ",
        a: "2018",
        b: "2020",
        c: "2022",
        d: "2019",
        correct: "d",
    },
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll(".answer");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitbtn = document.getElementById("submit");

let currQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectedAnswers();
    const currQuizData = quizData[currQuiz];

    questionEl.innerText = currQuizData.question;
    a_text.innerText = currQuizData.a;
    b_text.innerText = currQuizData.b;
    c_text.innerText = currQuizData.c;
    d_text.innerText = currQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answersEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectedAnswers() {
    answersEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitbtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currQuiz].correct) {
            score++;
        }
        currQuiz++;
        if (currQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You answered coorectly at ${score} / ${quizData.length} questions.</h2>`;
        }
    }
});
