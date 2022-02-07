
/**
 * Function to get week number for menu
 */
const d = new Date();
let menuDay = d.getDay();
const setWeekDayNumber = () => {
  if(menuDay === 0){
    menuDay = 6;
  }else{
    menuDay = menuDay - 1;
  }
  //console.log('sodexo menu daily number is: ', menuDay);
};
setWeekDayNumber();


console.log('menu day: ', menuDay);

const dataUrl = `https://www.sodexo.fi/ruokalistat/output/weekly_json/152`;

//const metaData = lunchMenu.meta;

let sodexoCourses = [];
/**
 * Making menus from Sodexo JSON object
 * @param {String} menu JSON
 */
const parseSodexoMenu = (menu, language) => {
  console.log('sodexo menu', menu);
  sodexoCourses = [];
  try{
    const courses = Object.values(menu[menuDay].courses);
    for (const course of courses) {
      if(language === 'Fi') {
        sodexoCourses.push(course.title_fi + " " + course.dietcodes);
      }
      if(language === 'En'){
        sodexoCourses.push(course.title_en + " " + course.dietcodes);
      }
    }
  }catch (e){
    sodexoCourses.push('Ravintolat ovat tänään kiinni! <br/> Restaurants are closed today!');
    return sodexoCourses;
  }

  return sodexoCourses;
};


const SodexoMenu = { parseSodexoMenu, dataUrl };
export default SodexoMenu;
