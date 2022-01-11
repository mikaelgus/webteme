
const menu = document.querySelector('.menu');

//haetaan json
import lunchMenu from './sodexo-day-example.json';
console.log('lounasmenu jsonista', lunchMenu);
const finalMenu = lunchMenu.courses;

//tehdään suomenkielinen ruokalista
let coursesFi = [];
const makeFinMenu = () => {
  for(let i = 1; i < 10; i++){
    coursesFi.push(finalMenu[i].title_fi);
  };
  console.log('uusi fin menu', coursesFi);
};
makeFinMenu(finalMenu);

//tehdään englanninkielinen ruokalista
let coursesEn = [];
const makeEngMenu = () => {
  for(let i = 1; i < 10; i++){
    coursesEn.push(finalMenu[i].title_en);
    //console.log(finalMenu[i].title_fi);
  };
  console.log('uusi eng menu', coursesEn);
};
makeEngMenu(finalMenu);

//tulostetaan suomenkielinen menu
const printFinMenu = () => {
  document.getElementById('menu').innerHTML = '';
  coursesFi.forEach(meal => {
    document.getElementById('menu').innerHTML +=
    `<p>${meal}</p><p> * * * </p>`;
  });
};
//tulostetaan englanninkilinen menu
const printEngMenu = () => {
document.getElementById('menu').innerHTML = '';
coursesEn.forEach(meal => {
  document.getElementById('menu').innerHTML +=
  `<p>${meal}</p><p> * * * </p>`;
});
};

//kielen valinta
let languageBool = true;
const printMenu = () => {
  languageBool = languageBool ? false : true;
  if(languageBool === false){
    printEngMenu();
  }
  if(languageBool === true){
    printFinMenu();
  }
};

//menun sorttaus
let sortBool = true;
const sortMenu = () => {
  document.getElementById('menu').innerHTML = '';
  sortBool = sortBool ? false : true;
  if(sortBool === false){
    coursesEn.sort();
    coursesFi.sort();
    if(languageBool === true){
      printFinMenu();
    }
    if(languageBool === false){
      printEngMenu();
    }
  }
  if(sortBool === true){
    coursesEn.reverse();
    coursesFi.reverse();
    if(languageBool === true){
      printFinMenu();
    }
    if(languageBool === false){
      printEngMenu();
    }
  }
};
//random sapuska
const randomMeal = () => {
  let food;
  document.getElementById('menu').innerHTML = '';
  if(languageBool === true){
    food = coursesFi[Math.floor(Math.random() * coursesFi.length)];
    document.getElementById('menu').innerHTML = '<br><p>RANDOM LOUNAS JUURI SINULLE!</p><p> * * * </p>'
  + `<p> ${food} </p><p> * * * </p>`;
  }
  if(languageBool === false){
    food = coursesEn[Math.floor(Math.random() * coursesEn.length)];
    document.getElementById('menu').innerHTML = '<br><p>RANDOM LUNCH JUST FOR YOO!</p><p> * * * </p>'
  + `<p> ${food} </p><p> * * * </p>`;
  }
};

printFinMenu();
document.getElementById('language').addEventListener('click', printMenu);
document.getElementById('sort').addEventListener('click', sortMenu);
document.getElementById('random').addEventListener('click', randomMeal);

