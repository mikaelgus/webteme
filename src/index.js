const menu = document.querySelector(".menu1");

//haetaan json
import lunchMenu from "./sodexo-day-example.json";
console.log("lounasmenu jsonista", lunchMenu);
const finalMenu = lunchMenu.courses;

//tehdään suomenkielinen ruokalista kaikkineen
let coursesAll = [];
const makeFinMenuAll = () => {
  for (let i = 1; i < 10; i++) {
    coursesAll.push(finalMenu[i]);
  }
  console.log("uusi fin menu kaikilla herkuilla", coursesAll);
};
makeFinMenuAll(finalMenu);

//tulostetaan FIN menu kaikilla tiedoilla
const tulostaFinMenu = () => {
  document.getElementById("menu2").innerHTML = "";
  document.getElementById("menu2").innerHTML = '<img id="sodexo" src="assets/ogosodexo.webp" alt="sodexon logo"/>' + '<h3>MENU 2</h3>';
  coursesAll.forEach((meal) => {
    document.getElementById("menu2").innerHTML += `<h3>${meal.category}</h3>
    <p>${meal.title_fi}</p>
    <p>${meal.properties}</p>
    <p>${meal.price}</p>
    <p></p>
    <p> * * * </p>`;
  });
};

//tulostetaan ENG menu kaikilla tiedoilla
const tulostaEngMenu = () => {
  document.getElementById("menu2").innerHTML = "";
  document.getElementById("menu2").innerHTML = '<img id="sodexo" src="assets/ogosodexo.webp" alt="sodexon logo"/>' + '<h3>MENU 2</h3>';
  coursesAll.forEach((meal) => {
    document.getElementById("menu2").innerHTML += `<h3>${meal.category}</h3>
    <p>${meal.title_en}</p>
    <p>${meal.properties}</p>
    <p>${meal.price}</p>
    <p> * * * </p>`;
  });
};

//tehdään suomenkielinen ruokalista
let coursesFi = [];
const makeFinMenu = () => {
  for (let i = 1; i < 10; i++) {
    coursesFi.push(finalMenu[i].title_fi);
  }
};
makeFinMenu(finalMenu);

//tehdään englanninkielinen ruokalista
let coursesEn = [];
const makeEngMenu = () => {
  for (let i = 1; i < 10; i++) {
    coursesEn.push(finalMenu[i].title_en);
    //console.log(finalMenu[i].title_fi);
  }
};
makeEngMenu(finalMenu);

//tulostetaan suomenkielinen menu
const printFinMenu = () => {
  document.getElementById("menu1").innerHTML = "";
  document.getElementById("menu1").innerHTML = "<h3>MENU 1</h3>";
  coursesFi.forEach((meal) => {
    document.getElementById(
      "menu1"
    ).innerHTML += `<p>${meal}</p><p> * * * </p>`;
  });
};
//tulostetaan englanninkilinen menu
const printEngMenu = () => {
  document.getElementById("menu1").innerHTML = "";
  document.getElementById("menu1").innerHTML = "<h3>MENU 1</h3>";
  coursesEn.forEach((meal) => {
    document.getElementById(
      "menu1"
    ).innerHTML += `<p>${meal}</p><p> * * * </p>`;
  });
};

//kielen valinta
let languageBool = true;
const printMenu = () => {
  languageBool = languageBool ? false : true;
  if (languageBool === false) {
    printEngMenu();
    tulostaEngMenu();
  }
  if (languageBool === true) {
    printFinMenu();
    tulostaFinMenu();
  }
};
//uusi shorttaus
const shorttaaMenu = () => {
  coursesAll.sort((a, b) => {
    if(languageBool === true){
      if(a.title_fi == b.title_fi){
        return 0;
      }
      if(a.title_fi < b.title_fi){
        return -1;
      }
      if(a.title_fi > b.title_fi){
        return 1;
      }
    }
    if(languageBool === false){
      if(a.title_en == b.title_en){
        return 0;
      }
      if(a.title_en < b.title_en){
        return -1;
      }
      if(a.title_en > b.title_en){
        return 1;
      }
    }
  });
};
//uusi reverse
const reverseMenu = () => {
  coursesAll.sort((a, b) => {
    if(languageBool === true){
      if(a.title_fi == b.title_fi){
        return 0;
      }
      if(a.title_fi < b.title_fi){
        return 1;
      }
      if(a.title_fi > b.title_fi){
        return -1;
      }
    }
    if(languageBool === false){
      if(a.title_en == b.title_en){
        return 0;
      }
      if(a.title_en < b.title_en){
        return 1;
      }
      if(a.title_en > b.title_en){
        return -1;
      }
    }
  });
};



//menun sorttaus
let sortBool = true;
const sortMenu = () => {
  document.getElementById("menu1").innerHTML = "";
  sortBool = sortBool ? false : true;
  if (sortBool === false) {
    coursesEn.sort();
    coursesFi.sort();
    shorttaaMenu();
    if (languageBool === true) {
      printFinMenu();
      tulostaFinMenu();
    }
    if (languageBool === false) {
      printEngMenu();
      tulostaEngMenu();
    }
  }
  if (sortBool === true) {
    coursesEn.reverse();
    coursesFi.reverse();
    reverseMenu();
    if (languageBool === true) {
      printFinMenu();
      tulostaFinMenu();
    }
    if (languageBool === false) {
      printEngMenu();
      tulostaEngMenu();
    }
  }
};
//random sapuska
const randomMeal = () => {
  let food;
  document.getElementById("menu1").innerHTML = "";
  document.getElementById("menu2").innerHTML = "";
  if (languageBool === true) {
    food = coursesFi[Math.floor(Math.random() * coursesFi.length)];
    document.getElementById("menu1").innerHTML =
      "<br><p>RANDOM LOUNAS JUURI SINULLE!</p><p> * * * </p>" +
      `<p> ${food} </p><p> * * * </p>`;
    food = coursesAll[Math.floor(Math.random() * coursesAll.length)];
    document.getElementById("menu2").innerHTML =
      "<p></p><p>RANDOM LOUNAS JUURI SINULLE!</p>" +
      `<h3>${food.category}</h3>
  <p>${food.title_fi}</p>
  <p>${food.properties}</p>
  <p>${food.price}</p>
  <p></p>
  <p> * * * </p>
  <p></p>`;
  }
  if (languageBool === false) {
    food = coursesEn[Math.floor(Math.random() * coursesEn.length)];
    document.getElementById("menu1").innerHTML =
      "<br><p>RANDOM LUNCH JUST FOR YOO!</p><p> * * * </p>" +
      `<p> ${food} </p><p> * * * </p>`;
    food = coursesAll[Math.floor(Math.random() * coursesAll.length)];
    document.getElementById("menu2").innerHTML =
      "<br><p>RANDOM LOUNAS JUURI SINULLE!</p>" +
      `<h3>${food.category}</h3>
  <p>${food.title_en}</p>
  <p>${food.properties}</p>
  <p>${food.price}</p>
  <p> * * * </p>`;
  }
};
tulostaFinMenu();
printFinMenu();
document.getElementById("language").addEventListener("click", printMenu);
document.getElementById("sort").addEventListener("click", sortMenu);
document.getElementById("random").addEventListener("click", randomMeal);
