import SodexoMenu from './modules/sodexo';


//tulostetaan FIN menu kaikilla tiedoilla
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

//tulostetaan ENG menu kaikilla tiedoilla
const tulostaEngMenu = () => {
  document.getElementById('menu1').innerHTML = '';
  document.getElementById('menu1').innerHTML = '<h3>MENU 2</h3>';
  SodexoMenu.coursesAll.forEach((meal) => {
    document.getElementById('menu1').innerHTML += `<p id="category">${meal.category}</p>
    <p id="title">${meal.title_en}</p>
    <p id="properties">${meal.properties}</p>
    <p id="price">${meal.price}</p>
    <p> * * * </p>`;
  });
};

//kielen valinta
let languageBool = true;
const printMenu = () => {
  languageBool = languageBool ? false : true;
  if (languageBool === false) {
    tulostaEngMenu();
  }
  if (languageBool === true) {
    tulostaFinMenu();
  }
};
//uusi shorttaus
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
//uusi reverse
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



//menun sorttaus
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
//random sapuska
const randomMeal = () => {
  let food;
  document.getElementById('menu1').innerHTML = '';
  if (languageBool === true) {
    food = SodexoMenu.coursesAll[Math.floor(Math.random() * SodexoMenu.coursesAll.length)];
    document.getElementById('menu1').innerHTML =
      "<p></p><p>RANDOM LOUNAS JUURI SINULLE!</p>" +
      `<p id="category">${meal.category}</p>
    <p id="title">${meal.title_fi}</p>
    <p id="properties">${meal.properties}</p>
    <p id="price">${meal.price}</p>
    <p> * * * </p>`;
  }
  if (languageBool === false) {
    food = SodexoMenu.coursesAll[Math.floor(Math.random() * SodexoMenu.coursesAll.length)];
    document.getElementById('menu1').innerHTML =
      "<br><p>RANDOM LUNCH JUST FOR YOU!</p>" +
      `<p id="category">${meal.category}</p>
    <p id="title">${meal.title_en}</p>
    <p id="properties">${meal.properties}</p>
    <p id="price">${meal.price}</p>
    <p> * * * </p>`;
  }
};

/**
 * Starting application
 */
const start = () => {
  tulostaFinMenu();
  document.getElementById('language').addEventListener('click', printMenu);
  document.getElementById('sort').addEventListener('click', sortMenu);
  document.getElementById('random').addEventListener('click', randomMeal);
} ;
start();

