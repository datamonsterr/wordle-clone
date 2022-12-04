import { falseLetter, halfLetter, trueLetter } from "./container.js";
import * as M from "./M.js";

let keyItems = document.querySelectorAll(".key-item");

M.body.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    for (let i = 0; i < keyItems.length; i++) {
      if (falseLetter.has(keyItems[i].textContent)) {
        keyItems[i].style.backgroundColor = "var(--background-item-false";
      }
      if (halfLetter.has(keyItems[i].textContent)) {
        keyItems[i].style.backgroundColor = "var(--background-item-half)";
      }
      if (trueLetter.has(keyItems[i].textContent)) {
        keyItems[i].style.backgroundColor = "var(--background-item-true)";
      }
    }
  }
});

keyItems.forEach((keyItem) => {
  keyItem.onclick = () => {
    console.log(keyItem);
    M.body.dispatchEvent(
      new KeyboardEvent("keydown", { key: keyItem.textContent })
    );
  };
});
