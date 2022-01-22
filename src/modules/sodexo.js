

import lunchMenu from "../sodexo-day-example.json";
const finalMenu = lunchMenu.courses;
const metaData = lunchMenu.meta;

const coursesAll = [];

/**
 * Making menu from Sodexo JSON object
 */
const makeMenuAll = () => {
  for (let i = 1; i < 10; i++) {
    coursesAll.push(finalMenu[i]);
  }
};
makeMenuAll(finalMenu);

const SodexoMenu = {coursesAll, metaData};
export default SodexoMenu;
