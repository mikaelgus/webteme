import lunchMenu from "../sodexo-day-example.json";

const metaData = lunchMenu.meta;
const sodexoFin = [];
const sodexoEng = [];

/**
 * Making menus from Sodexo JSON object
 * @param {String} menu JSON
 */
const parseSodexo = (menu) => {
  const courses = Object.values(menu);
  for (const course of courses) {
    sodexoFin.push(course.title_fi + " " + course.properties);
    sodexoEng.push(course.title_en + " " + course.properties);
  }
};
parseSodexo(lunchMenu.courses);


const SodexoMenu = { metaData, sodexoFin, sodexoEng };
export default SodexoMenu;
