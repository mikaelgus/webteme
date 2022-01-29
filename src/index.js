const input = document.querySelector("input");
const result = document.querySelector("#responce");

let keyStore = [];
let codeLine = keyStore.join("");

/**
 * Storing key inputs to an array and then using join()
 * to make a string after that checking if that contains
 * a secret word to activate a cheat code
 */
const secretCode = "code";
input.addEventListener("keyup", (event) => {
  //console.log("keyup:", event.key);
  keyStore.push(event.key);
  let codeLine = keyStore.join("");
  if (codeLine.includes(secretCode)) {
    result.innerHTML = "Secret code founded! Cheat activated!";
    console.log("Secret code founded! Cheat activated!");
    keyStore = [];
  }
  if (event.key === "Enter") {
    console.log("You hit enter!");
    result.innerHTML = "You hit -Enter- code not found!";
    //console.log("keys: ", keyStore);
    keyStore = [];
  }
  //console.log('codeline: ', codeLine);
});

/**
 * Event listener to show user coordinates after double click
 */
window.addEventListener("dblclick", (event) => {
  //console.log(event);
  let pointX = event.clientX;
  let pointY = event.clientY;
  document.querySelector("#double-click").innerHTML =
    "Double clicked coords: X:" + pointX + " Y: " + pointY;
  console.log("Double clicked coords: X:" + pointX + " Y: " + pointY);
});

/**
 * Function to count touches on the screen
 *
 * @param {event} event
 */
const countFingers = (event) => {
  let count = event.touches.lenght;
  document.querySelector("#finger").innerHTML = count;
  console.log("Number of fingers: ", count);
};

/**
 * Alert after 15 seconds from starting a page
 */
const hurryAlert = () => {
  console.log("Hurry UP you have browsed 15 seconds!");
  //alert('Hurry UP you have browsed 15 seconds!');
};
setInterval(hurryAlert, 15000);

/**
 * Alert if idle 15 sec
 */
const idleAlert = () => {
  console.log("Wake up! 15 seconds and nothing is happening!");
  //alert('Wake up! 15 seconds and nothing is happening!');
};

/**
 * Function to reset idle timer
 */
let timer;
const resetTimer = () => {
  console.log("timer reseted");
  clearTimeout(timer);
  timer = setTimeout(idleAlert, 15000); // time is in milliseconds
};

/**
 * Mouse and key listeners for idle functions
 */
window.addEventListener("mousemove", () => {
  resetTimer();
});
window.addEventListener("keydown", () => {
  resetTimer();
});

/**
 * Reseting idle timer on window load
 */
const idleTimer = () => {
  window.onload = resetTimer();
};
idleTimer();
