
import { setWeekDayNumber } from "./tools";

const dataUrl = `https://www.sodexo.fi/ruokalistat/output/weekly_json/`;

//const metaData = lunchMenu.meta;

let sodexoCourses = [];

/**
 * Making menus from Sodexo JSON object
 * @param {String} menu JSON
 */
const parseSodexoMenu = (menu, language) => {
  console.log("sodexo menu", menu);
  sodexoCourses = [];
  try {
    const courses = Object.values(menu[setWeekDayNumber()].courses);
    for (const course of courses) {
      if (language === "Fi") {
        sodexoCourses.push(course.title_fi + " " + course.dietcodes);
      }
      if (language === "En") {
        if (!course.title_en) {
          course.title_en = course.title_fi;
        }
        sodexoCourses.push(course.title_en + " " + course.dietcodes);
      }
    }
  } catch (e) {
    sodexoCourses.push(
      "Ravintolat ovat tänään kiinni! <br/> Restaurants are closed today!"
    );
  }
  return sodexoCourses;
};

const SodexoMenu = { parseSodexoMenu, dataUrl };
export default SodexoMenu;
