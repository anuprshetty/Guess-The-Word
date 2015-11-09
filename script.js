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

const init = () => {
  winCount = 0;
  lossCount = 10;
  randomWord = "";
  word.innerText = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "<h2>You Won</h2>";
              word.innerHTML = `<h3>The word was <span>${randomWord}</span></h3>`;
              startBtn.innerText = "Restart";
              //block all buttons
              showResult();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          resultText.innerHTML = "<h2>Game Over</h2>";
          word.innerHTML = `<h3>The word was <span>${randomWord}</span></h3>`;
          showResult();
        }
      }

      //Disable clicked buttons
      button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};
