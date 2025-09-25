// DOM ELEMENTS

// DOM references for each screen and UI element
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons for starting and restarting the quiz
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// Elements for displaying question and progress
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");

// Final result display elements
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

// Array of quiz questions with answer choices and correctness flags
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },

    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },

    {
        question: "Which of these is NOT a programming language?",
        answers: [
            {text: "Java", correct: false },
            {text: "Python", correct: false },
            {text: "Banana", correct: true },
            {text: "JavaScript", correct: false }
        ]
    },

    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false }
        ]
    },
];

// QUIZ STATE VARIABLES

// Tracks current question index and score
let currentQuestionIndex = 0;
let score = 0;

// Prevents multiple answer selections per question
let answersDisabled = false;

// Initialize total questions and max score display
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENT LISTENERS

// Start and restart button handlers
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

// Starts the quiz by resetting state and showing the first question
function startQuiz() {
    //reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

// Displays the current question and answer buttons
function showQuestion() {
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // Update progress bar based on current question
    // Calculate progress bar width as a percentage
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Clear previous answers
    answersContainer.innerHTML = "";

    // Create answer buttons dynamically
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // Store correctness in data attribute
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);

        answersContainer.append(button);
    });
}

// Handles answer selection and updates score
function selectAnswer(event) {
    if (answersDisabled) return;
    // Disable further clicks to prevent multiple answers
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Styles correct and incorrect answers
    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    // Update score if correct
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    // Move to next question or show results
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
        
    }, 1000);
}

// Displays final score and feedback message
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    
    const scorePercent = (score / quizQuestions.length) * 100;

    // Show feedback based on score percentage
    if (scorePercent === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (scorePercent >= 80) {
        resultMessage.textContent = "Great job! You know your stuff";
    } else if (scorePercent >= 60) {
        resultMessage.textContent = "Good effort! Keep Learning!";
    } else if (scorePercent >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

// Restarts the quiz from the beginning
function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}