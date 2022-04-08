// References to various elements
const playername = document.getElementById('playername'); // reference to username form
const saveScoreBtn = document.getElementById('saveScoreBtn'); // reference to save score button
const finalScore = document.getElementById('final-score'); // reference to final-score text
const nbCorrectAnswers = document.getElementById('nb-correct'); // reference to nb-correct text
const resultText = document.getElementById('result-text'); // reference to result-text text
const latestScore = localStorage.getItem('latestScore'); // reference to score in local storage
const correctAnswers = localStorage.getItem('latestCorrect'); // reference to nb of correct answers in local storage

const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // read highScores array or create it 

// Constants definition
const MAX_HIGH_SCORES = 5; // top N socre to save

finalScore.innerText = 'You scored ' + latestScore + ' Points';
nbCorrectAnswers.innerText = "You've answersed " + correctAnswers + ' questions correctly';

// Display result text based on score
if (latestScore >= 600) {
    resultText.innerText = 'congrats! 🎉';
}

else if (latestScore > 300) {
    resultText.innerText = 'Nice 😎';
}

else {
    resultText.innerText = "You'll do better next time 😐";
}

// Enable save button only if name entered
playername.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !playername.value;
});

// Upate high scores
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: latestScore,
        name: playername.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');

};