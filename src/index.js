import SodexoMenu from "./modules/sodexo";
import FazerMenu from "./modules/fazer";
import { fetchData } from "./modules/network";
import { Sortable } from "@shopify/draggable";

let showMenu = "show";
/**
 * Dropdown toggle menus
 *
 * @param {String} number menu code
 * @param {String} name of restaurant
 */
const toggleMenu = (number, name) => {
  let toggleMenuCode = document.querySelector(number);
  let toggleNameColor = document.getElementById(name);
  if (showMenu === "show") {
    toggleMenuCode.style = "display: none";
    toggleNameColor.style.backgroundColor = "white";
    toggleNameColor.style.color = "var(--main-font-color)";
    showMenu = "none";
    start();
  } else {
    showMenu = "show";
    toggleMenuCode.style = "display: grid";
    toggleNameColor.style.backgroundColor = "var(--main-bg-color)";
    toggleNameColor.style.color = "var( --header-font-color)";
    start();
  }
};

document
  .getElementById("arabia")
  .addEventListener("click", () => toggleMenu(".m4", "arabia"));
document
  .getElementById("karaportti")
  .addEventListener("click", () => toggleMenu(".m2", "karaportti"));
document
  .getElementById("myllypuro")
  .addEventListener("click", () => toggleMenu(".m3", "myllypuro"));
document
  .getElementById("myyrmaki")
  .addEventListener("click", () => toggleMenu(".m1", "myyrmaki"));

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
 * Set finnish texts
 */
const setLanguageTextsFi = () => {
  sloganEn.style.display = "none";
  sloganFi.style.display = "block";
  document.getElementById("header-text").innerHTML = "Mitä tänään syödään?";
  document.getElementById("language").innerHTML = "Kieli";
  document.getElementById("frontpage").innerHTML = "Etusivu";
  document.getElementById("restaurants").innerHTML = "Ravintolat";
};
/**
 * Set english texts
 */
const setLanguageTextsEn = () => {
  sloganEn.style.display = "block";
  sloganFi.style.display = "none";
  document.getElementById("header-text").innerHTML = "What to eat today?";
  document.getElementById("language").innerHTML = "Language";
  document.getElementById("frontpage").innerHTML = "Frontpage";
  document.getElementById("restaurants").innerHTML = "Restaurants";
};


let languageBool;
/**
 * Get language from localstorage if not stored 'En'
 * then use 'Fi'
 */
const getStoragedLanguage = () => {
  let language = localStorage.getItem('language');
  if(language == 'En'){
    languageBool = 'En';
    setLanguageTextsEn();
  }else{
    languageBool = 'Fi';
    setLanguageTextsFi();
  }
};

/**
 * Toggle language (finnish/english) and save it to localstorage
 */
console.log('storage', localStorage);
const changeLanguage = () => {
  if (languageBool === "Fi") {
    setLanguageTextsEn();
    languageBool = "En";
    localStorage.setItem('language', languageBool);
    start();
  } else {
    languageBool = "Fi";
    setLanguageTextsFi();
    localStorage.setItem('language', languageBool);
    start();
  }
};

/**
 * Printing menus
 *
 * @param {String} restaurant
 * @param {Array} menu
 * @param {String} areaId
 */
const renderMenu = (restaurant, place, menu, areaId) => {
  document.getElementById(areaId).innerHTML = "";
  document.getElementById(
    areaId
  ).innerHTML = `<p id="restaurant">${restaurant} <i id="map-marker" class="fa fa-map-marker" aria-hidden="true"></i></p>
    <p id="place">${place}</p><br/>`;
  menu.forEach((object) => {
    document.getElementById(areaId).innerHTML += `<p id="title">${object}</p>`;
    document.getElementById(areaId).innerHTML += `<p>* * *</p>`;
  });
};

/**
 * Sortable menus
 */
const sortable = new Sortable(document.querySelectorAll(".container"), {
  draggable: ".menu",
});

/**
 * Starting application
 */
const start = () => {
  getStoragedLanguage();
  let courseSodexo;
  //Render Sodexo Myyrmäki
  fetchData(SodexoMenu.dataUrl + 152).then((data) => {
    courseSodexo = SodexoMenu.parseSodexoMenu(data.mealdates, languageBool);
    renderMenu("Sodexo", "Metropolia Myyrmäki", courseSodexo, "menu1");
  });

  //Render Sodexo Myllypuro
  fetchData(SodexoMenu.dataUrl + 158).then((data) => {
    courseSodexo = SodexoMenu.parseSodexoMenu(data.mealdates, languageBool);
    renderMenu("Sodexo", "Metropolia Myllypuro", courseSodexo, "menu3");
  });

  //Render Eurest Arabia (sodexo data atm fro rendering)
  fetchData(SodexoMenu.dataUrl + 152).then((data) => {
    courseSodexo = SodexoMenu.parseSodexoMenu(data.mealdates, languageBool);
    renderMenu("Compass group", "Metropolia Arabia", courseSodexo, "menu4");
  });

  // Render Fazer
  let courseFazer;
  if (languageBool == "Fi") {
    fetchData(FazerMenu.dataUrlFi, true).then((data) => {
      courseFazer = FazerMenu.parseFazerMenus(data.LunchMenus);
      renderMenu("Fazer", "Metropolia Karaportti", courseFazer, "menu2");
    });
  }
  if (languageBool == "En") {
    fetchData(FazerMenu.dataUrlEn, true).then((data) => {
      courseFazer = FazerMenu.parseFazerMenus(data.LunchMenus);
      renderMenu("Fazer", "Metropolia Karaportti", courseFazer, "menu2");
    });
  }
  document.getElementById("language").addEventListener("click", changeLanguage);
};
start();

//Window eventlistener on load
//window.addEventListener("load", xxxxxxx);
