const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;


function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion() {

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);

    const optionLen = currentQuestion.options.length;
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }

    optionContainer.innerHTML = '';


    for (let i = 0; i < optionLen; i++) {
        const optionIndex = i;
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++;
}

function getResult(element) {
    const optionElements = optionContainer.getElementsByClassName("option");
    for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].style.backgroundColor = "";
        optionElements[i].style.color = "";
        optionElements[i].classList.remove("selected");
    }

    const id = parseInt(element.id);
    if (id === currentQuestion.answer) {
        correctAnswers++;
    }
    element.style.backgroundColor = "grey";
    element.style.color = "white";
    element.classList.add("selected");
}

function next() {
    const selectedOption = optionContainer.querySelector(".selected");
    if (!selectedOption) {
        alert("Please select an option before proceeding!");
        return;
    }
    if (questionCounter === quiz.length) {
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function quizOver() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
}

function tryAgainQuiz() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome() {
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

function startQuiz() {

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailableQuestions();
    getNewQuestion();
}