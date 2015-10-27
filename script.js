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

