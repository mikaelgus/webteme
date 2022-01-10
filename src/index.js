console.log('Arvaa numero!');

const minRandomValue = 1; //ramdom pienin arvo
const maxRandomValue = 20; //random maksimi arvo

let randomNumber = Math.floor(Math.random() * (maxRandomValue - minRandomValue) + minRandomValue);

const guesses = document.querySelector('.guesses');
const counter = document.querySelector('.counter');
const timeUsed = document.querySelector('.timeUsed');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

let startingTime = 0;
let endingTime = 0;

const checkGuess = () => {
  console.log('lähtöaika: ', startingTime);
  const maxNumberOfGuesses = 10; //arvauksien maksimimäärä
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
    startingTime = Date.now();
  }
  guesses.textContent += userGuess + ' ';
  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    endingTime = Date.now();
    console.log('loppuaika: ', endingTime);
    timerTime(endingTime - startingTime); //lähetetään millisekunnit funktioon
    setGameOver();
  } else if (guessCount === maxNumberOfGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    endingTime = Date.now();
    console.log('loppuaika: ', endingTime);
    timerTime(endingTime - startingTime); //lähetetään millisekunnit funktioon
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
  counter.textContent = 'Number of guesses: ' + guessCount; //tulostetaan arvauksien määrä
  guessCount++;
  guessField.value = '';
  guessField.focus();
};

guessSubmit.addEventListener('click', checkGuess);

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start New Game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
};
//laske timeri ja tulosta se
const timerTime = (timeValue) => {
  const dateValue = new Date(timeValue);
  timeUsed.textContent = 'Time used: ' + dateValue.toLocaleString("en-US", {second: "numeric"}) + ' seconds';
};

const resetGame = () => {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
};
