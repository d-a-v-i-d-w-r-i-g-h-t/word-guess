var startButton = document.getElementById("start-button");
var resetScoreButton = document.getElementById("reset-score-button");

var mysteryWordEl = document.getElementById("mystery-word");

var winCountEl = document.getElementById("winCount");
var lossCountEl = document.getElementById("lossCount");

var countdownEl = document.getElementById("countdown");
var countdownTextEl = document.getElementById("countdown-text");

const gameDuration = 3;

// need Array of mystery words
// need interval timer to get countdown


var score = {
    wins: 0,
    losses: 0
};


resetScoreButton.addEventListener("click", function() {
    resetScore();
});

function resetScore () {
    score.wins = 0;
    score.losses = 0;

    writeScore()
}


function writeScore() {
    
    console.log(score);
    localStorage.setItem("scoreStringify", JSON.stringify(score));

    winCountEl.textContent = score.wins;
    lossCountEl.textContent = score.losses;
}

function getScore() {
    score = JSON.parse(localStorage.getItem("scoreStringify"));
}


startButton.addEventListener("click", function() {
    console.log(score);
    startCountdown();
});


function startCountdown() {
    console.log(score);

    var secondsRemaining = gameDuration;
    var timerInterval = setInterval(function() {

        secondsRemaining--;

        countdownEl.textContent = secondsRemaining;
        countdownTextEl.textContent = "seconds remaining";

        if(secondsRemaining === 0) {
            clearInterval(timerInterval);

            countdownEl.textContent = "Time's up!";
            countdownTextEl.textContent = "";

            startButton.textContent = "Play again?"

            
            // temp for testing
            // score.wins = 3;
            // score.losses = 2;

            console.log(score);

            // writeScore();
            // ************
        }

    }, 1000);

}



function init() {
    startButton.textContent = "Start"
    countdownEl.textContent = "Are you ready?";

    getScore();
}

init();