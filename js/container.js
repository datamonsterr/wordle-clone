import * as M from "./M.js";
let currentRow = 0;
let currentCol = 0;
let currentWord = "";
export let wrongLetter = new Set();
export let trueLetter = new Set();
export let wrongPosLetter = new Set();
let wordList = [];
let word = "crush";

M.getWordList()
  .then((data) => {
    for (const word in data) {
      if (word.length === 5) wordList.push(word);
    }
    // word = wordList[Math.floor(Math.random() * wordList.length)];
  })
  .catch((err) => {
    throw err;
  });

M.body.addEventListener("keydown", (event) => {
  if (M.isLetter(event.key) && currentCol < 5) {
    M.items[currentRow][currentCol].textContent = event.key.toUpperCase();
    currentWord += event.key;
    currentCol++;
  }
  if (event.key === "Enter" && currentWord.length === 5) {
    if (wordList.includes(currentWord)) {
      for (let i = 0; i < 5; i++) {
        if (word.includes(currentWord[i])) {
          if (word.indexOf(currentWord[i]) === i) {
            M.items[currentRow][i].classList.add("flip-true");
            trueLetter.add(currentWord[i].toUpperCase());
          } else {
            M.items[currentRow][i].classList.add("flip-half");
            wrongPosLetter.add(currentWord[i].toUpperCase());
          }
        } else {
          M.items[currentRow][i].classList.add("flip-false");
          wrongLetter.add(currentWord[i].toUpperCase());
        }
        M.items[currentRow][i].style.animationDelay = i / 8 + "s";
      }
      if (currentWord === word) {
        setTimeout(() => {
          M.popup.style.display = "block";
          M.popup.style.cursor = "pointer";
          M.popup.textContent = "AGAIN?";
        }, 1500);
      }
      currentWord = "";
      currentRow++;
      currentCol = 0;
    } else {
      M.popup.style.display = "block";
      M.popup.textContent = "This word is invalid";
      setTimeout(() => {
        M.popup.style.display = "none";
      }, 1500);
    }
    if (currentRow === 6 && currentWord !== word) {
      M.popup.style.display = "block";
      M.popup.textContent = word;
    }
  }
  if ((event.key === "Backspace" || event.key === "Delete") && currentCol > 0) {
    M.items[currentRow][currentCol - 1].textContent = "";
    currentWord = currentWord.slice(0, -1);
    currentCol--;
  }
});
