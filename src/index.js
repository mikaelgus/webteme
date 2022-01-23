
const minRandomValue = 1; //ramdom min value
const maxRandomValue = 100; //random mmax value
const maxNumberOfGuesses = 10; //number of max guesses

/**
 * Random number for a guess game
 */
let randomNumber = Math.floor(Math.random() * (maxRandomValue - minRandomValue) + minRandomValue);

const guesses = document.querySelector('.guesses');
const counter = document.querySelector('.counter');
const timeUsed = document.querySelector('.timeUsed');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const computerSubmit = document.querySelector('.computerSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

let startingTime = 0;
let endingTime = 0;

/**
 * Guess results
 */
const checkGuess = () => {

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
    timerTime(endingTime - startingTime); //sending millsecs to function
    setGameOver();
  } else if (guessCount === maxNumberOfGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    endingTime = Date.now();
    timerTime(endingTime - startingTime); //sending millsecs to function
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
  counter.textContent = 'Number of guesses: ' + guessCount; //printing count of guesses
  guessCount++;
  guessField.value = '';
  guessField.focus();
};

let testLoopOn = true;
let guessedNumbers = [];
/**
 * Computer turn
 * If computer's quess is lower than random then min value is that number
 * If computer's quess is higher than random then max value is that number
 * @param {int} computerGuess
 */
const checkComputerGuess = (computerGuess) => {
  guessedNumbers.push(computerGuess);
  const maxNumberOfGuesses = 10; //number of max guesses
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
    startingTime = Date.now();
  }
  guesses.textContent += computerGuess + ' ';
  if (computerGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    endingTime = Date.now();
    timerTime(endingTime - startingTime); //sending millsecs to function
    testLoopOn = false;
    console.log('Computer quesses array: ', guessedNumbers);
    console.log('Number of quesses: ', guessedNumbers.length);
    setGameOver();
  } else if (guessCount === maxNumberOfGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    endingTime = Date.now();
    timerTime(endingTime - startingTime); //sending millsecs to function
    testLoopOn = false;
    console.log('Computer quesses array', guessedNumbers);
    console.log('Number of quesses: ', guessedNumbers.length);
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(computerGuess < randomNumber) {
      computerMinValue = computerGuess;
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(computerGuess > randomNumber) {
      computerMaxValue = computerGuess;
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
  counter.textContent = 'Number of guesses: ' + guessCount; //printing count of guesses
  guessCount++;
  guessField.value = '';
  guessField.focus();
};

let computerMinValue = minRandomValue;
let computerMaxValue = maxRandomValue;

/**
 * Computer's guess
 * Best way guess a number is halving a range
 * If min value is 1 and max value is 100 then first guess is 50 and so on
 */
const computerGuess = () => {
  let computersRandomGuess = Math.floor(((computerMaxValue - computerMinValue)/2) + computerMinValue);
  //console.log('computers number', computersRandomGuess);
  checkComputerGuess(computersRandomGuess);
};

/**
 * Computer game loop
 * 1 game
 */
const testingLoop = () => {
  for(let i = 0; i < maxNumberOfGuesses; i++) {
    if(testLoopOn == false) { break; }
    computerGuess();
  }
};

/**
* 1001 times test loop
* Max guesses seems to be 10 and min 1
* Average guesses are 5.8
*/
const longLoop = () => {
  let guessedCount = [];
  let totalCounting = 0;
  for(let i = 0; i < 1001; i++){
    testingLoop();
    const guessCounter = guessCount-1;
    guessedCount.push(guessCounter);
    //console.log(guessCounter);
    totalCounting += guessCounter;

    resetGame();
  }
  const averageGuesses = totalCounting / 1001;
  console.log('Average guesses: ', averageGuesses);
  console.log('Max number of counts: ', Math.max(...guessedCount));
  console.log('Min number of counts: ', Math.min(...guessedCount));
  guessedCount = [];
};

/**
 * Setting fields when game is over
 */
const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  computerSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start New Game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
};

/**
 * Counting time used on a game
 * @param {Time} timeValue current time value
 */
const timerTime = (timeValue) => {
  const dateValue = new Date(timeValue);
  timeUsed.textContent = 'Time used: ' + dateValue.toLocaleString("en-US", {second: "numeric"}) + ' seconds';
};

/**
 * Resetting a game
 */
const resetGame = () => {
  guessCount = 1;
  guessedNumbers = [];
  //console.log('game resetted');
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  computerSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  testLoopOn = true;

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
  computerMinValue = minRandomValue;
  computerMaxValue = maxRandomValue;
};

longLoop();
guessSubmit.addEventListener('click', checkGuess);
computerSubmit.addEventListener('click', testingLoop);
