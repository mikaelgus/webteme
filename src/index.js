import SodexoMenu from "./modules/sodexo";
import FazerMenu from "./modules/fazer";

/**
 * Toggle language (finnish/english)
 */
let languageBool = "fi";
const changeLanguage = () => {
  if (languageBool === "fi") {
    languageBool = "en";
    renderMenu("Sodexo", SodexoMenu.sodexoEng, "menu1");
    renderMenu("Fazer", FazerMenu.fazerEng, "menu2");
  } else {
    languageBool = "fi";
    renderMenu("Sodexo", SodexoMenu.sodexoFin, "menu1");
    renderMenu("Fazer", FazerMenu.fazerFin, "menu2");
  }
};

/**
 * Sortin menus
 * @param {Array} courses menu array
 * @param {string} order 'asc'/'desc'
 * @returns {Array} sorted menu
 */
const sortMenus = (menu, order = "asc") => {
  const sortedMenu = menu.sort();
  if (order === "desc") {
    sortedMenu.reverse();
  }
  return sortedMenu;
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
  renderMenu('Sodexo', SodexoMenu.sodexoFin, 'menu1');
  renderMenu('Fazer', FazerMenu.fazerFin, 'menu2');

  document.getElementById("language").addEventListener("click", changeLanguage);
  document.getElementById("sort").addEventListener("click", () => {
    //TODO
  });
  document.getElementById("random").addEventListener("click", () => {
    alert(pickARandomMeal(SodexoMenu.sodexoFin));
  });
};
start();
