import fazerFinnish from '../fazer-fin-example.json';
import fazerEnglish from '../fazer-en-example.json';

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
      dailyMeals += meal.Name + ' ' + meal.Diets + ', ';
    }
    return oneMenu.Name ? oneMenu.Name + ': ' + dailyMeals : dailyMeals;
  });
  return dailyMenu;
};

const fazerFinA = parseFazerMenus(fazerFinnish.LunchMenus, 0);
const fazerEngA = parseFazerMenus(fazerEnglish.LunchMenus, 0);

const fazerFin = [];
const fazerEng = [];

/**
 * Removing last comma
 *
 * @param {Array} where edited menu
 * @param {Array} from menu
 */
const removeLastComma = (where, from) => {
  from.forEach((meal) => {
    let line = meal.replace(/,(?=\s*$)/, '');
    where.push(line);
  });
};
removeLastComma(fazerFin, fazerFinA);
removeLastComma(fazerEng, fazerEngA);

const FazerMenu = {fazerFin, fazerEng};
export default FazerMenu;
