const message = document.getElementById("message");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
let randomWord = "";
let winCount = 0;
let lossCount = 0;

const showResult = () => {
  controls.classList.remove("hide");
};

startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";

  const wordnik_api_key = "e1h2slr24u78rwf7x2dg863q52bqy96e8b2m76zf8605mcoca";
  const url =
    "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&maxCorpusCount=-1&minDictionaryCount=5&maxDictionaryCount=-1&minLength=4&maxLength=5&api_key=" +
    wordnik_api_key;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("wordnik api error");
      }
      return response.json();
    })
    .then((data) => {
      randomWord = data.word.replace(/[^a-zA-Z]/g, "");

      let displayItem = "";
      randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
      });

      userInpSection.innerHTML = displayItem;
      userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
    })
    .catch((error) => {
      console.error("wordnik api error: ", error);
    });
};

