const d = new Date();
const menuDay = (d.getDay()-1);
//console.log('menu day: ', menuDay);

const dataUrl = `https://www.sodexo.fi/ruokalistat/output/weekly_json/152`;

//const metaData = lunchMenu.meta;

let sodexoCourses = [];
/**
 * Making menus from Sodexo JSON object
 * @param {String} menu JSON
 */
const parseSodexoMenu = (menu, language) => {
  sodexoCourses = [];
  const courses = Object.values(menu[menuDay].courses);
  for (const course of courses) {
    if(language === 'Fi') {
      sodexoCourses.push(course.title_fi + " " + course.dietcodes);
    }
    if(language === 'En'){
      sodexoCourses.push(course.title_en + " " + course.dietcodes);
    }

  }
  return sodexoCourses;
};


const SodexoMenu = { parseSodexoMenu, dataUrl };
export default SodexoMenu;
