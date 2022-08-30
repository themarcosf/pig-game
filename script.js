//use strict mode in all scripts
"use strict";

const dice = document.querySelector(".dice");
const diceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");
const currentScore = document.querySelectorAll(".current-score");
const grandScore = document.querySelectorAll(".score");
const backgrounds = document.querySelectorAll(".player");

let roll_;
let currentScore_ = 0;
let grandScore_ = [0, 0];
let activePlayer_ = 0;
let isPlaying = true;

newGameBtn.addEventListener("click", () => {
  currentScore_ = 0;
  grandScore_ = [0, 0];
  activePlayer_ = 0;

  currentScore[0].innerHTML = 0;
  currentScore[1].innerHTML = 0;

  grandScore[0].innerHTML = 0;
  grandScore[1].innerHTML = 0;

  backgrounds[0].classList.remove("player--winner");
  backgrounds[1].classList.remove("player--winner");

  dice.classList.add("hidden");
  isPlaying = true;
});

holdBtn.addEventListener("click", () => {
  if (isPlaying) {
    grandScore_[activePlayer_] += currentScore_;
    if (grandScore_[activePlayer_] >= 100) {
      isWinner();
    } else {
      currentScore_ = 0;
      grandScore[activePlayer_].innerHTML = grandScore_[activePlayer_];
      currentScore[activePlayer_].innerHTML = currentScore_;
      changeBackground();
    }
    !activePlayer_ ? activePlayer_++ : activePlayer_--;
  }
});

diceBtn.addEventListener("click", () => {
  if (isPlaying) {
    dice.classList.remove("hidden");
    roll_ = Math.trunc(Math.random() * 6) + 1;
    currentScore_ += roll_;
    currentScore[activePlayer_].innerHTML = currentScore_;

    switch (roll_) {
      case 1:
        dice.src = "dice-1.png";
        currentScore_ = 0;
        currentScore[activePlayer_].innerHTML = currentScore_;
        changeBackground();
        !activePlayer_ ? activePlayer_++ : activePlayer_--;
        break;
      default:
        dice.src = `dice-${roll_}.png`;
    }
  }
});

const changeBackground = function () {
  backgrounds[0].classList.toggle("player--active");
  backgrounds[1].classList.toggle("player--active");
};

const isWinner = function () {
  grandScore[activePlayer_].innerHTML = grandScore_[activePlayer_];
  backgrounds[activePlayer_].classList.add("player--winner");
  isPlaying = false;
};
