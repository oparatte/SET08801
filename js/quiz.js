// References to various elements
const question = document.getElementById('question'); // reference to question element
const answers = Array.from(document.getElementsByClassName('answer-box')); //reference to answers text
const media = document.getElementById('player'); // reference to player element
const progressText = document.getElementById('progress-text'); // reference to quiz progression text
const scoreText = document.getElementById('score'); 
const timeCount = document.getElementById('timer-counter'); // reference to quiz timer
const popup = document.getElementById('popup'); // reference to popup box
const qContainer = document.getElementById('question-container'); // reference to question-container
const startBtn = document.getElementById('start-btn'); // reference to question-container

const urlParams = new URLSearchParams(window.location.search); // get category parameter from url
const quizCategory = urlParams.get('category'); 

// Variables definition
let currentQuestion = {};
let enableAnswers = false; // to enable/disable users to answer questions 
let score = 0; // score tracker
let questionCounter = 0; // track current question number
let timerValue = 30; // time to answer questions
let availableQuesions = []; // array of avialable questions
let counter; // timer counter
let correctAnswers = 0; // correct answers counter
let wrongAnswers = 0; // wrong answers counter
let timeScore; // to include time in score calculation

// Constants definition
const CORRECT_POINTS = 30; // number of points for correct answer
const NB_QUESTIONS = 15; // number of questions in quiz

console.log(quizCategory) // --- DEBUG ONLY --- 

// Fetching questions from json file
let questions = [];

fetch(`${quizCategory}`)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;   
        window.addEventListener("load", (open) => {
            popup.style.display = "block";
            qContainer.style.display = "none";
        });
    
        startBtn.addEventListener("click", () => {
            popup.style.display = "none";
            qContainer.style.display = "block";
            startQuiz();
        });
    })

.catch((err) => {
    console.error(err);
});

// function to start the quiz
startQuiz = () => {
    questionCounter = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    availableQuesions = [...questions];
    getNewQuestion(); //call getNewQuestion function
};

getNewQuestion = () => {
    clearInterval(counter); //clear counter
    console.log('timer cleared!'); // 
    startTimer(timerValue); //call startTimer function
    if (availableQuesions.length === 0 || questionCounter >= NB_QUESTIONS) { // check if questions left in array OR questionCounter
        localStorage.setItem('latestScore', score); // store score in local storage
        localStorage.setItem('latestCorrect', correctAnswers); // store correctAnswers in local storage
        return window.location.assign('results.html'); // go to results page
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${NB_QUESTIONS}`; // update quiz progression text

    const questionIndex = Math.floor(Math.random() * availableQuesions.length); 
    currentQuestion = availableQuesions[questionIndex]; // select random question based nb of question in array
    question.innerText = currentQuestion.question; // display question in question-box
    media.src = currentQuestion.source;

    answers.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]; // display answers in answer-box
    });

    availableQuesions.splice(questionIndex, 1); // remove displayed question from array
    enableAnswers = true;
};

// check is answer is correct
answers.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!enableAnswers) return; 

        enableAnswers = false;
        const selectedChoice = e.target;
        console.log(e.target) // --- DEBUG ONLY --- 
        const selectedAnswer = selectedChoice.dataset['number']; // set selectedAnswer with data-number of clicked answer 
        console.log(selectedAnswer) // --- DEBUG ONLY ---  

        if (selectedAnswer == currentQuestion.answer) {
            score = score + (CORRECT_POINTS + timeScore);
            console.log(score) // --- DEBUG ONLY --- 
            correctAnswers++;
        }

        getNewQuestion();

    });
});

// Function to start timer
startTimer = (time) => {
    counter = setInterval(timer, 1000);
    function timer() {
        console.log('Timer start!'); // --- DEBUG ONLY --- 
        if (time < 0) {
            getNewQuestion();
        }
        else {
            timeCount.innerText = 'Time left: ' + time;
            time--;
            timeScore = time
        };
    };
};