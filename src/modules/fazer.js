
const d = new Date();
const menuYear = d.getFullYear();
const menuMonth = d.getMonth()+1;
const menuDate = d.getDate();
const menuDay = (d.getDay()-1);
const menuDailyDate = `${menuYear}-${menuMonth}-${menuDate}`;
//console.log('koko päiväys: ', d);
//console.log('vuosi: ', menuYear);
//console.log('kuukausi: ', menuMonth);
//console.log('päivä: ', menuDate);
//console.log('monesko päivä viikosta: ', menuDay);

const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${menuDailyDate}`;
const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${menuDailyDate}`;

/**
 *
 * @param {Array} lunchMenu lunch menu
 * @param {Number} day  number a day of week
 * @returns {Array} daily menu
 */
const parseFazerMenus = (lunchMenu) => {
  const dailyMenu = lunchMenu[menuDay].SetMenus.map(oneMenu => {
    let dailyMeals = '';
    for (const meal of oneMenu.Meals) {
      dailyMeals += meal.Name + ' ' + meal.Diets + '<br/>';
    }
    return oneMenu.Name ? oneMenu.Name + ': ' + dailyMeals : dailyMeals;
  });
  return dailyMenu;
};


const FazerMenu = {parseFazerMenus, dataUrlFi, dataUrlEn};
export default FazerMenu;
