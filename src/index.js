import SodexoMenu from './modules/sodexo';
import FazerMenu from './modules/fazer';

let currentFazerMenu = FazerMenu.fazerFin;

/**
 * Printing finnish Sodexo menu
 */
const tulostaFinMenu = () => {
  document.getElementById('menu1').innerHTML = '';
  document.getElementById('menu1').innerHTML = `<p id="restaurant">${SodexoMenu.metaData.ref_title}</p>`;
  SodexoMenu.coursesAll.forEach((meal) => {
    document.getElementById('menu1').innerHTML += `<p id="category">${meal.category}</p>
    <p id="title">${meal.title_fi}</p>
    <p id="properties">${meal.properties}</p>
    <p id="price">${meal.price}</p>
    <p></p>
    <p> * * * </p>`;
  });
};

/**
 * Printing english Sodexo menu
 */
const tulostaEngMenu = () => {
  document.getElementById('menu1').innerHTML = '';
  document.getElementById('menu1').innerHTML = `<p id="restaurant">${SodexoMenu.metaData.ref_title}</p>`;
  SodexoMenu.coursesAll.forEach((meal) => {
    document.getElementById('menu1').innerHTML += `<p id="category">${meal.category}</p>
    <p id="title">${meal.title_en}</p>
    <p id="properties">${meal.properties}</p>
    <p id="price">${meal.price}</p>
    <p> * * * </p>`;
  });
};

/**
 * Toggle language (finnish/english)
 */
let languageBool = true;
const printMenu = () => {
  languageBool = languageBool ? false : true;
  if (languageBool === false) {
    tulostaEngMenu();
    currentFazerMenu = FazerMenu.fazerEng;
  }
  if (languageBool === true) {
    tulostaFinMenu();
    currentFazerMenu = FazerMenu.fazerFin;
  }
};

/**
 * Sortin 1st menu
 */
const shorttaaMenu = () => {
  SodexoMenu.coursesAll.sort((a, b) => {
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

/**
 * Sorting 1st menu (reverse)
 */
const reverseMenu = () => {
  SodexoMenu.coursesAll.sort((a, b) => {
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

/**
 * Sorting 1st menu
 */
let sortBool = true;
const sortMenu = () => {
  document.getElementById('menu1').innerHTML = '';
  sortBool = sortBool ? false : true;
  if (sortBool === false) {
    shorttaaMenu();
    if (languageBool === true) {
      tulostaFinMenu();
    }
    if (languageBool === false) {
      tulostaEngMenu();
    }
  }
  if (sortBool === true) {
    reverseMenu();
    if (languageBool === true) {
      tulostaFinMenu();
    }
    if (languageBool === false) {
      tulostaEngMenu();
    }
  }
};

/**
 * Printing random food from 1st menu
 */
const randomMeal = () => {
  let food;
  document.getElementById('menu1').innerHTML = '';
  if (languageBool === true) {
    food = SodexoMenu.coursesAll[Math.floor(Math.random() * SodexoMenu.coursesAll.length)];
    document.getElementById('menu1').innerHTML =
      '<p></p><p id="restaurant">RANDOM LOUNAS JUURI SINULLE!</p>' +
      `<p id="category">${food.category}</p>
    <p id="title">${food.title_fi}</p>
    <p id="properties">${food.properties}</p>
    <p id="price">${food.price}</p>
    <p> * * * </p>`;
  }
  if (languageBool === false) {
    food = SodexoMenu.coursesAll[Math.floor(Math.random() * SodexoMenu.coursesAll.length)];
    document.getElementById('menu1').innerHTML =
      '<br><p id="restaurant">RANDOM LUNCH JUST FOR YOU!</p>' +
      `<p id="category">${food.category}</p>
    <p id="title">${food.title_en}</p>
    <p id="properties">${food.properties}</p>
    <p id="price">${food.price}</p>
    <p> * * * </p>`;
  }
};

/**
 * Printing Fazer's menu
 */
const fazerMenu = () => {
  document.getElementById('menu2').innerHTML = '';
  document.getElementById('menu2').innerHTML = `<p id="restaurant">Fazerin joku mättölä</p>`;
  currentFazerMenu.forEach((object) => {
    document.getElementById('menu2').innerHTML += `<p>Annos:</p>`;
    object.Meals.forEach((names) => {
      document.getElementById('menu2').innerHTML += `<p id="title">${names.Name} - ${names.Diets}</p>`;
    });
    document.getElementById('menu2').innerHTML += `<p>* * *</p>`;
  });
};


/**
 * Starting application
 */
const start = () => {
  tulostaFinMenu();
  fazerMenu();
  document.getElementById('language').addEventListener('click', () => {printMenu(); fazerMenu();});
  document.getElementById('sort').addEventListener('click', sortMenu);
  document.getElementById('random').addEventListener('click', randomMeal);
} ;
start();

