export const container = document.getElementById("container");
export const originalItems = document.querySelectorAll("#container .item");
let k = 0;
export let items = new Array(5);
for (let i = 0; i < 5; i++) {
  items[i] = new Array(5);
}
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    items[i][j] = originalItems[k];
    k++;
  }
}
export const body = document.body;
export function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

export const getWordList = () =>
  fetch(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
  ).then((res) => res.json());

export const popup = document.getElementById("popup");
