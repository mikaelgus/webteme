import SodexoMenu from "./modules/sodexo";
import FazerMenu from "./modules/fazer";
import { fetchData } from "./modules/network";

const sloganFi = document.querySelector('#sloganFi');
const sloganEn = document.querySelector('#sloganEn');

/**
 * Change theme color from dropdown menu
 */
let dropdown = document.getElementById("themecolor");
dropdown.onchange = () => {
  let selecteColor = dropdown.value;
  localStorage.setItem("color", selecteColor);
  //console.log('change theme color', selecteColor);
  document.documentElement.style.setProperty(
    "--main-bg-color",
    localStorage.getItem("color")
  );
};

/**
 * Get theme color from localsotrage
 */
//console.log("color from localstorage", localStorage.getItem("color"));
document.documentElement.style.setProperty(
  "--main-bg-color",
  localStorage.getItem("color")
);

/**
 * Search bar listener
 */
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (event) => {
  const inputText = event.target.value;
  console.log(inputText);
});

/**
 * Searching something (not ready)
 *
 * @param {String} searchText text from search bar input
 */
const findString = (searchText) => {
  window.find(searchText);
};

/**
 * Toggle language (finnish/english)
 */
let languageBool = "Fi";
const changeLanguage = () => {
  if (languageBool === "Fi") {
    sloganEn.style.display = 'block';
    sloganFi.style.display = 'none';
    languageBool = "En";
    start();
  } else {
    languageBool = "Fi";
    sloganEn.style.display = 'none';
    sloganFi.style.display = 'block';
    start();
  }
};

//Sorting menus
let sortOrder = "asc";
/**
 * Ugly sorting menus but working
 * @param {Array} menu1
 * @param {Array} menu2
 * @returns
 */
const sortMenus = (menu1, menu2) => {
  let sortedMenu1;
  let sortedMenu2;
  if (sortOrder == "asc") {
    sortOrder = "desc";
    sortedMenu1 = menu1.sort();
    sortedMenu2 = menu2.sort();
  } else {
    sortOrder = "asc";
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
 * Simple language switch for slogan
 */
const onloadLanguageSettings = () => {
  sloganEn.style.display = 'none';
  sloganFi.style.display = 'block';
};

/**
 * Starting application
 */
const start = () => {
  //Render Sodexo
  let courseSodexo;
  fetchData(SodexoMenu.dataUrl).then((data) => {
    courseSodexo = SodexoMenu.parseSodexoMenu(data.mealdates, languageBool);
    renderMenu("Sodexo", courseSodexo, "menu1");
  });

  // Render Fazer
  let courseFazer;
  if (languageBool == "Fi") {
    fetchData(FazerMenu.dataUrlFi, true).then((data) => {
      courseFazer = FazerMenu.parseFazerMenus(data.LunchMenus);
      renderMenu("Fazer", courseFazer, "menu2");
    });
  }
  if (languageBool == "En") {
    fetchData(FazerMenu.dataUrlEn, true).then((data) => {
      courseFazer = FazerMenu.parseFazerMenus(data.LunchMenus);
      renderMenu("Fazer", courseFazer, "menu2");
    });
  }

  document.getElementById("language").addEventListener("click", changeLanguage);

  document.getElementById("sort").addEventListener("click", () => {
    //TODO: better sorting
    sortMenus(courseSodexo, courseFazer);
    renderMenu("Sodexo", courseSodexo, "menu1");
    renderMenu("Fazer", courseFazer, "menu2");
  });
  document.getElementById("random").addEventListener("click", () => {
    //TODO: first random menu then random meal
    alert(pickARandomMeal(courseSodexo)); //This is bugging!!
  });
};
start();

//Window eventlistener for language of slogan
window.addEventListener('load', onloadLanguageSettings);
