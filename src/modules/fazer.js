import { setWeekDayNumber } from "./tools";

//get date
const d = new Date();
const menuYear = d.getFullYear();
const menuMonth = d.getMonth() + 1;
const menuDate = d.getDate();
const menuDailyDate = `${menuYear}-${menuMonth}-${menuDate}`;
//better version
const newDate = new Date().toISOString().split('T')[0];

const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${newDate}`;
const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${menuDailyDate}`;

/**
 *
 * @param {Array} lunchMenu lunch menu
 * @param {Number} day  number a day of week
 * @returns {Array} daily menu
 */
const parseFazerMenus = (lunchMenu) => {
  console.log("fazer menu", lunchMenu);
  const dailyMenu = lunchMenu[setWeekDayNumber()].SetMenus.map((oneMenu) => {
    let dailyMeals = "";
    for (const meal of oneMenu.Meals) {
      dailyMeals += meal.Name + " " + meal.Diets + "<br/>";
    }
    return oneMenu.Name ? oneMenu.Name + ": " + dailyMeals : dailyMeals;
  });
  if (dailyMenu.length === 0) {
    dailyMenu.push(
      "Ravintolat ovat tänään kiinni! <br/> Restaurants are closed today!"
    );
  }
  return dailyMenu;
};

const FazerMenu = { parseFazerMenus, dataUrlFi, dataUrlEn };
export default FazerMenu;
