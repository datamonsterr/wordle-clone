import * as M from "./M.js";
let currentRow = 0;
let currentCol = 0;
let currentWord = "";
export let falseLetter = new Set();
export let trueLetter = new Set();
export let halfLetter = new Set();
let wordList = [];
let word = "hthao";

M.getWordList()
  .then((data) => {
    for (const word in data) {
      if (word.length === 5) wordList.push(word);
    }
    // word = wordList[Math.floor(Math.random() * wordList.length)];
    wordList.push("hthao");
  })
  .catch((err) => {
    throw err;
  });

function Delete() {
  M.items[currentRow][currentCol - 1].textContent = "";
  currentWord = currentWord.slice(0, -1);
  currentCol--;
}
function ApplyAnimation(boxType, index, row) {
  M.items[row][index].classList.add("flip-" + boxType);
  setTimeout(() => {
    M.items[row][index].classList.remove("flip-" + boxType);
    M.items[row][
      index
    ].style.backgroundColor = `var(--background-item-${boxType})`;
  }, (index / 8) * 1000 + 500);
  eval(boxType + "Letter.add(currentWord[index].toUpperCase())");
  M.items[row][index].style.animationDelay = index / 8 + "s";
}

function NextLine() {
  currentWord = "";
  currentRow++;
  currentCol = 0;
}

function Losing() {
  M.popup.style.display = "block";
  M.popup.textContent = word;
}
function Winning() {
  setTimeout(() => {
    // M.items[0][0].classList.add("flip-true");
    // M.items[0][0].textContent = "S";
    M.popup.style.display = "block";
    M.popup.style.cursor = "pointer";
    M.popup.textContent = "AGAIN?";
    M.popup.onclick = () => {
      location.reload();
    };
  }, 1500);
}

function InvalidWord() {
  M.popup.style.display = "block";
  M.popup.textContent = "This word is invalid";
  setTimeout(() => {
    M.popup.style.display = "none";
  }, 1500);
}

M.body.addEventListener("keydown", (event) => {
  if (M.isLetter(event.key) && currentCol < 5) {
    M.items[currentRow][currentCol].textContent = event.key.toUpperCase();
    currentWord += event.key;
    currentCol++;
  } else if (event.key === "Enter" && currentWord.length === 5) {
    if (wordList.includes(currentWord)) {
      // Flip Animation
      for (let i = 0; i < 5; i++) {
        let isIncluded = word.includes(currentWord[i]);
        let isTruePos = word[i] === currentWord[i];
        if (isIncluded && isTruePos) {
          ApplyAnimation("true", i, currentRow);
        } else if (isIncluded) {
          ApplyAnimation("half", i, currentRow);
        } else {
          ApplyAnimation("false", i, currentRow);
        }
      }
      // Winning
      let isWon = currentWord === word;
      if (isWon) Winning();
      NextLine();
    } else {
      InvalidWord();
    }
    let isLost = currentRow === 6 && currentWord !== word;
    if (isLost) Losing();
  } else if (
    (event.key === "Backspace" || event.key === "Delete") &&
    currentCol > 0
  ) {
    Delete();
  }
});
