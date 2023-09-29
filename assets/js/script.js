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


var myScore = {
    wins: 0,
    losses: 0
};

resetScoreButton.addEventListener("click", function() {
    resetScore();
});

function resetScore () {
    myScore.wins = 0;
    myScore.losses = 0;

    writeScore()
}



function writeScore() {       
    winCountEl.textContent = myScore.wins;
    lossCountEl.textContent = myScore.losses;
}

function getScore() {
    myScore = JSON.parse(localStorage.getItem("scoreStringify"));
    writeScore()
}

function saveScore() {
    localStorage.setItem("scoreStringify", JSON.stringify(myScore));
    writeScore()
}


startButton.addEventListener("click", function() {
    console.log(myScore);
    startCountdown();
});


function startCountdown() {
    
    console.log(myScore);

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
            myScore.wins = 3;
            myScore.losses = 2;

            console.log(myScore);

            saveScore();
            // ************
        }

    }, 1000);

}



function init() {
    startButton.textContent = "Start"
    countdownEl.textContent = "Are you ready?";

    // getScore();
}

init();

