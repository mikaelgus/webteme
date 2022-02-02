const d = new Date();
const menuDay = (d.getDay()-1);
console.log('menu day: ', menuDay);

const dataUrl = `https://www.sodexo.fi/ruokalistat/output/weekly_json/152`;
import lunchMenu from "../sodexo-day-example.json";

const metaData = lunchMenu.meta;
const sodexoFin = [];
const sodexoEng = [];


const parseSodexoMenus = (lunchMenu) => {
  console.log('from sodexo parse', lunchMenu);
  const dailyMenu = lunchMenu[menuDay].courses.map(oneMenu => {
    let dailyMeals = '';
    for (const meal of oneMenu.Meals) {
      dailyMeals += meal.title_fi + ' ' + meal.dietcodes + '<br/>';
    }
    return oneMenu.Name ? oneMenu.Name + ': ' + dailyMeals : dailyMeals;
  });
  return dailyMenu;
};

/**
 * Making menus from Sodexo JSON object
 * @param {String} menu JSON
 */
const parseSodexoMenu = (menu) => {
  console.log('from sodexo parse whole menu', menu);
  console.log('from sodexo parse', menu[menuDay]);
  const courses = Object.values(menu[menuDay].courses);
  for (const course of courses) {
    sodexoFin.push(course.title_fi + " " + course.dietcodes);
    //sodexoEng.push(course.title_en + " " + course.dietcodes);
  }
  console.log('parse sodexo old', sodexoFin);
  return sodexoFin;
};
//parseSodexo(lunchMenu.courses);


const SodexoMenu = { parseSodexoMenu, dataUrl, metaData, sodexoFin, sodexoEng };
export default SodexoMenu;
