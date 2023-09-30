var startButton = document.getElementById("start-button");
var resetScoreButton = document.getElementById("reset-score-button");

var gameAreaEl = document.getElementById("game-area");

var winCountEl = document.getElementById("winCount");
var lossCountEl = document.getElementById("lossCount");

var countdownEl = document.getElementById("countdown");
var countdownTextEl = document.getElementById("countdown-text");

const gameDuration = 61;
const penalty = 5;
const wordList = ["sandwich", "moustache", "cat", "balloon", "grocery", "distribution", "river", "chocolate", "possibility", "article", "poet", "philosophy", "housing", "republic", "construction", "restaurant", "payment", "definition", "pizza", "area", "people", "confusion", "childhood", "breath", "leader", "committee", "teaching", "employer", "coffee", "opinion", "queen", "college", "interaction", "psychology", "proposal", "accident", "discussion", "shopping", "mom", "disaster", "clothes", "potato", "session", "growth", "ear", "orange", "procedure", "affair", "salad", "dealer", "hall", "charity", "assumption", "country"];

// on init get scores from storage, if they are not
// there then save zero values to local variable
var myScore = {
    wins: 0,
    losses: 0
};
var keyPress;
var wordArray = [];
var numberOfLetters = 0;
var countCorrectLetters = 0;
var youWon = false;
var secondsRemaining = 0;

startButton.addEventListener("click", function() {
    playGame();
});

resetScoreButton.addEventListener("click", function() {
    resetScore();
});

document.addEventListener("keydown", function(event) {
   keyPress = event.key;
   checkForMatch(keyPress);
});


function checkForMatch(key) {
    var correctMatch = false;
    for (var i = 0; i < numberOfLetters; i++) {

        if (wordArray[i] === key) {
            document.getElementById("letter" + i).textContent = key;
            countCorrectLetters++
            correctMatch = true;
        }

    }

    if (correctMatch === false) {
        secondsRemaining -= penalty;
    }

    if (countCorrectLetters === numberOfLetters) {
        youAreAWinner();
        endGame();
    }
}


function resetScore () {
    myScore.wins = 0;
    myScore.losses = 0;

    saveScore()
}

function resultMessage(iWon) {
    var message;
    if (iWon === true) {
        message = "YOU WON!!!🏆"
    } else {
        message = "YOU LOST!!!😖"
    }
    clearDivs();
    addDiv(message, 0)
}

function clearDivs() {
    gameAreaEl.innerHTML = "";
}

function addDiv(text, index) {
    var div = document.createElement("div");
    div.textContent = text;
    div.setAttribute("id", "letter" + index);
    gameAreaEl.appendChild(div);
}

function playGame() {
    countCorrectLetters = 0;
    youWon = false;

    startCountdown();
    var mysteryWord = getNextWord();
    wordArray = mysteryWord.split("");

    numberOfLetters = wordArray.length;

    clearDivs() 

    for (var i = 0; i < numberOfLetters; i++) {
        addDiv("_", i)
    }
}



function getNextWord() {
    
    wordIndex = JSON.parse(localStorage.getItem("wordIndex"));
    if (!wordIndex) {
        wordIndex = Math.floor(Math.random() * wordList.length);
        console.log("got random index")
    }
    wordIndex++;

    if (wordIndex >= wordList.length) {
        wordIndex = 0;
    }
    localStorage.setItem("wordIndex", JSON.stringify(wordIndex));
    
    return wordList[wordIndex];
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


function startCountdown() {
    
    secondsRemaining = gameDuration;
    var timerInterval = setInterval(function() {

        secondsRemaining--;

        countdownEl.textContent = secondsRemaining;
        countdownTextEl.textContent = "seconds remaining";

        if (youWon === true) {
            clearInterval(timerInterval);
        }

        if(secondsRemaining <= 0) {
            clearInterval(timerInterval);

            youAreALoser()
            endGame();
        }

    }, 1000);

}

function youAreAWinner() {
    youWon = true;
    myScore.wins++;
}

function youAreALoser() {
    youWon = false;
    myScore.losses++;
    countdownEl.textContent = "Time's up!";
    countdownTextEl.textContent = "";
}


function endGame() {
    saveScore();

    resultMessage(youWon);

    startButton.textContent = "Play again?"
}


function init() {
    startButton.textContent = "Start"
    countdownEl.textContent = "Are you ready?";

    getScore();
}

init();

