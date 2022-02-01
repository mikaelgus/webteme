const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2022-02-01`;
const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=2022-02-01`;

const d = new Date();
console.log('koko päiväys: ', d);
console.log('vuosi: ', d.getFullYear());
console.log('kuukausi: ', d.getMonth()+1);
console.log('päivä: ', d.getDate());
console.log('monesko päivä viikosta: ', d.getDay());

/**
 *
 * @param {Array} lunchMenu lunch menu
 * @param {Number} day  number a day of week
 * @returns {Array} daily menu
 */
const parseFazerMenus = (lunchMenu, day) => {
  const dailyMenu = lunchMenu[day].SetMenus.map(oneMenu => {
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
