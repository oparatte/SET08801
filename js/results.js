// References to various elements
const playername = document.getElementById('playername'); // reference to username form
const saveScoreBtn = document.getElementById('saveScoreBtn'); // reference to save score button
const finalScore = document.getElementById('final-score'); // reference to final-score text
const nbCorrectAnswers = document.getElementById('nb-correct'); // reference to nb-correct text
const resultText = document.getElementById('result-text'); // reference to result-text text
const resultImage = document.getElementById('result-img'); // reference to result-image image
const latestScore = localStorage.getItem('latestScore'); // reference to score in local storage
const correctAnswers = localStorage.getItem('latestCorrect'); // reference to nb of correct answers in local storage

// Read highScores array from local storage or create dummy scores
const highScores = JSON.parse(localStorage.getItem('highScores')) ||
[
{"Name": "Keyser Söze","Score": 652},
{"Name": "Ellen Ripley","Score": 547},
{"Name": "Sarah Connor","Score": 524},
{"Name": "Michael Corleone","Score": 491},
{"Name": "Lara Croft","Score": 485},
{"Name": "Marty McFly","Score": 418},
{"Name": "Harry Callahan","Score": 373},
{"Name": "Peter Venkman","Score": 296},
{"Name": "Wayne Campbell","Score": 248},
{"Name": "Joey Tribbiani","Score": 150}
]; 

// Constants definition
const MAX_HIGH_SCORES = 5; // top N socre to save

finalScore.innerText = "You've scored " + latestScore + ' Points';
nbCorrectAnswers.innerText = "You've answered " + correctAnswers + ' questions correctly';

// Display result text based on score
if (latestScore >= 600) {
    resultText.innerText = 'Fantastic!';
    resultImage.src = "images/sheep-thumbsup.gif" ;
}

else if (latestScore > 300) {
    resultText.innerText = 'Well done';
    resultImage.src = "images/sheep-clapping.gif";
}

else {
    resultText.innerText = "You'll do better next time";
    resultImage.src = "images/sheep-disappointed.gif";
}

// Enable save button only if name entered
playername.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !playername.value;
});

fetch("json/scores.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));

// Upate high scores
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        Name: playername.value,
        Score: latestScore,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.Score - a.Score);
    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    //window.location.assign('leaderboard.html');

};