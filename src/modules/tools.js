/**
 * Function to get day number from weekly menu
 */
const setWeekDayNumber = () => {
  let menuDay = new Date().getDay();
  menuDay === 0 ? (menuDay = 6) : (menuDay = menuDay - 1);
  //console.log('tools week daily number is: ', menuDay);
  return menuDay;
};

export { setWeekDayNumber };
