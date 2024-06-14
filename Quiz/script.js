const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start");
const numQuestions = document.querySelector("#num-questions");
const category = document.querySelector("#category");
const timePerQuestion = document.querySelector("#time");
const quiz = document.querySelector(".quiz");
const startScreen = document.querySelector(".start-screen");
const noOfQuestions = document.querySelector(".noOfQuestions");
const sidebar = document.querySelector(".sidebar");
const sidebarOpen = document.querySelector(".sidebar-open");
const sidebarClose = document.querySelector(".sidebar-close");
const sidebarBtnOpen = document.querySelector(".btn-open");
const sidebarBtnClose = document.querySelector(".btn-close");

let questions = [],
  allQuestion = [],
  time = 0,
  score = 0,
  currentQuestion,
  timer;

const sidebarQuestion = (num) => {
  for (let i = 1; i <= num; i++) {
    noOfQuestions.innerHTML += `<div class="ques" id="q${i}">${i}</div>`;
  }
};

sidebarBtnClose.addEventListener("click", () => {
  sidebarClose.classList.remove("hide");
  sidebarOpen.classList.add("hide");
});

sidebarBtnOpen.addEventListener("click", () => {
  sidebarClose.classList.add("hide");
  sidebarOpen.classList.remove("hide");
});

const startQuiz = () => {
  const num = numQuestions.value;
  const cat = category.value;
  loadingAnimation();
  sidebarQuestion(num);
  // console.log(num);

  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=medium&type=multiple`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
      setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        sidebar.classList.remove("hide");
        if (screen.width <= 900) {
          sidebarClose.classList.remove("hide");
          sidebarOpen.classList.add("hide");
        } else {
          sidebarClose.classList.add("hide");
          sidebarOpen.classList.remove("hide");
        }
        currentQuestion = 1;
        showQuestion(questions[0]);
      }, 1000);
    });
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number"),
    currQuestion = document.querySelector(`#q${currentQuestion}`);

  currQuestion.classList.add("not-attempt");
  questionText.innerHTML = question.question;

  const answers = [...question.incorrect_answers, question.correct_answer.toString()];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });
  submitBtn.disabled = true;

  questionNumber.innerHTML = ` Question <span class="current">${questions.indexOf(question) + 1}</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected"),
    currQuestion = document.querySelector(`#q${currentQuestion}`);

  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
      currQuestion.classList.remove("not-attempt");
      currQuestion.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
        if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
          answer.classList.add("correct");
          currQuestion.classList.remove("not-attempt");
          currQuestion.classList.add("incorrect");
        }
      });
    }
  } else {
    const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
      if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
        answer.classList.add("correct");
      }
    });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
