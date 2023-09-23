// Game Elements
const speedGame = document.querySelector(".speedGame");
const levels = document.querySelector(".levels");
const levelState = document.querySelector(".levelState");
const secondsOfLevel = document.querySelector(".secondsOfLevel");
const start = document.querySelector(".start");
const input = document.querySelector(".input");
const hint = document.querySelector(".hint");
const timeSpan = document.querySelector(".timeSpan");
const totalScore = document.querySelector(".totalScore");
const numOfScore = document.querySelector(".numOfScore");

// Levels Configuration
const levelsObject = {
  easy: 6,
  normal: 3,
  hard: 2,
};

const defaultValue = levelsObject.normal;
const defaultLevelKey = Object.keys(levelsObject).find(
  (key) => levelsObject[key] === defaultValue
);
levelState.innerHTML = defaultLevelKey;
timeSpan.innerHTML = defaultValue;
secondsOfLevel.innerHTML = defaultValue;
let defaultnum = 0;

// List of Words
const words = ["hello", "welcome", "style", "maintain", "catch","random"];
let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex];
words.splice(randomIndex, 1);

// Display Total Score
totalScore.innerHTML = words.length + 1;

// Start Button Click Event
start.addEventListener("click", startGame);

// Countdown Timer Function
function startGame() {
  input.focus();
  const upwords = document.createElement("div");
  upwords.setAttribute("class", "upwords-class");
  upwords.textContent = randomWord;
  speedGame.appendChild(upwords);
  speedGame.replaceChild(upwords, start);

  let countDown = setInterval(function () {
    timeSpan.innerHTML--;
    if (parseInt(timeSpan.innerHTML) <= 2) {
      timeSpan.classList.add("timespan");
    }

    if (parseInt(timeSpan.innerHTML) === 0) {
      clearInterval(countDown);
      comparing();
    }
  }, 1000);

  const wordsDivContainer = document.createElement("div");
  wordsDivContainer.setAttribute("class", "wordsDivContainer-class");
  wordsDivContainer.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    const wordsDiv = document.createElement("span");
    wordsDiv.setAttribute("class", "wordsDiv-class");
    wordsDiv.setAttribute("id", `${i}`);
    const wordsDivText = document.createTextNode(words[i]);
    wordsDiv.appendChild(wordsDivText);
    wordsDivContainer.appendChild(wordsDiv);
  }
  speedGame.replaceChild(wordsDivContainer, hint);
}

function comparing() {
  if (input.value == randomWord) {
    const winAudio = document.createElement("audio");
    winAudio.src =
      "..//script_projects/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";
    winAudio.play();
    speedGame.appendChild(winAudio);

    numOfScore.innerHTML++;

    if (words.length > 0) {
      timeSpan.innerHTML = defaultValue;
      const countDown = setInterval(function () {
        timeSpan.innerHTML--;
        if (parseInt(timeSpan.innerHTML) <= 2) {
          timeSpan.classList.add("timespan");
        }

        if (parseInt(timeSpan.innerHTML) === 0) {
          clearInterval(countDown);
          comparing();
        }
      }, 1000);

      randomIndex = Math.floor(Math.random() * words.length);
      randomWord = words[randomIndex];
      words.splice(randomIndex, 1);

      const upwords = document.createElement("div");
      upwords.setAttribute("class", "upwords-class");
      upwords.textContent = randomWord;
      speedGame.replaceChild(upwords, document.querySelector(".upwords-class"));

      input.value = "";
      input.focus();
    } else if (words.length === 0) {
      // Creating div of celebration
      const winner = document.createElement("div");
      winner.innerHTML = "congrats";
      winner.classList.add("win");
      speedGame.appendChild(winner);

      // Level pass audio
      const passAudio = document.createElement("audio");
      passAudio.src = "..//script_projects/success-fanfare-trumpets-6185 (1).mp3";
      passAudio.play();
      speedGame.appendChild(passAudio);

      // Removing upwords div
      const removingContainer = document.querySelector(".wordsDivContainer-class");
      speedGame.removeChild(removingContainer);

      // Removing random word
      const removingRandomWord = document.querySelector(".upwords-class");
      removingRandomWord.textContent = "";
    }
  } else {
    const loseAudio = document.createElement("audio");
    loseAudio.src = "..//script_projects/negative_beeps-6008.mp3";
    loseAudio.play();
    speedGame.appendChild(loseAudio);

    const loser = document.createElement("div");
    loser.innerHTML = "Game Over";
    loser.classList.add("lose");
    speedGame.appendChild(loser);
  }
}


  


