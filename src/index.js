import SodexoMenu from "./modules/sodexo";
import FazerMenu from "./modules/fazer";
import { fetchData } from "./modules/network";

/**
 * Toggle language (finnish/english)
 */
let languageBool = "Fi";
const changeLanguage = () => {
  if (languageBool === "Fi") {
    languageBool = "En";
    start();
  } else {
    languageBool = "Fi";
    start();
  }
};

//Sorting menus
let sortOrder = 'asc';
/**
 * Ugly sorting menus but working
 * @param {Array} menu1
 * @param {Array} menu2
 * @returns
 */
const sortMenus = (menu1, menu2) => {
  let sortedMenu1;
  let sortedMenu2;
  if(sortOrder == 'asc'){
    sortOrder = 'desc';
    sortedMenu1 = menu1.sort();
    sortedMenu2 = menu2.sort();
  }else{
    sortOrder = 'asc';
    sortedMenu1 = menu1.reverse();
    sortedMenu2 = menu2.reverse();
  }
  return sortedMenu1, sortedMenu2;
};

/**
 * Printing random food from 1st menu
 */
 const pickARandomMeal = (randomMenu) => {
  const randomIndex = Math.floor(Math.random() * randomMenu.length);
  return randomMenu[randomIndex];
};


/**
 * Printing menus
 *
 * @param {String} restaurant
 * @param {Array} menu
 * @param {String} areaId
 */
const renderMenu = (restaurant, menu, areaId) => {
  document.getElementById(areaId).innerHTML = "";
  document.getElementById(
    areaId
  ).innerHTML = `<p id="restaurant">${restaurant} <i id="map-marker" class="fa fa-map-marker" aria-hidden="true"></i></p>`;
  menu.forEach((object) => {
    document.getElementById(areaId).innerHTML += `<p id="title">${object}</p>`;
    document.getElementById(areaId).innerHTML += `<p>* * *</p>`;
  });
};

/**
 * Starting application
 */
const start = () => {
  //Render Sodexo
let courseSodexo;
  fetchData(SodexoMenu.dataUrl).then(data => {
    courseSodexo = SodexoMenu.parseSodexoMenu(data.mealdates, languageBool);
    renderMenu('Sodexo', courseSodexo, 'menu1');
  });

  // Render Fazer
  let courseFazer;
  if(languageBool == 'Fi'){
    fetchData(FazerMenu.dataUrlFi, true).then(data => {
      courseFazer = FazerMenu.parseFazerMenus(data.LunchMenus);
      renderMenu('Fazer', courseFazer, 'menu2');
    });
  }
  if(languageBool == 'En'){
    fetchData(FazerMenu.dataUrlEn, true).then(data => {
      courseFazer = FazerMenu.parseFazerMenus(data.LunchMenus);
      renderMenu('Fazer', courseFazer, 'menu2');
    });
  }

  document.getElementById("language").addEventListener("click", changeLanguage);

  document.getElementById("sort").addEventListener("click", () => {
    //TODO: better sorting
    sortMenus(courseSodexo, courseFazer);
    renderMenu('Sodexo', courseSodexo, 'menu1');
    renderMenu('Fazer', courseFazer, 'menu2');
  });
  document.getElementById("random").addEventListener("click", () => {
    //TODO: first random
    alert(pickARandomMeal(courseSodexo)); //This is bugging!!
  });
};
start();
