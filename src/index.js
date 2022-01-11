
const menu = document.querySelector('.menu');

let coursesEn = ["Hamburger, cream sauce and poiled potates",
                "Goan style fish curry and whole grain rice",
                "Vegan Chili sin carne and whole grain rice",
                "Broccoli puree soup, side salad with two napas",
                "Lunch baguette with BBQ-turkey filling",
                "Cheese / Chicken / Vege / Halloum burger and french fries"];
let coursesFi = ["Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
                "Goalaista kalacurrya ja täysjyväriisiä",
                "Vegaani Chili sin carne ja täysjyväriisi",
                "Parsakeittoa, lisäkesalaatti kahdella napaksella",
                "Lunch baguette with BBQ-turkey filling",
                "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset"];
//tulostetaan suomenkielinen menu
const printFinMenu = () => {
    document.getElementById('menu').innerHTML = '';
    coursesFi.forEach(meal => {
      document.getElementById('menu').innerHTML +=
      `<p>${meal}</p><p> * * * </p>`;
    });
};
//tulostetaan englanninkilinen menu
const printEngMenu = () => {
  document.getElementById('menu').innerHTML = '';
  coursesEn.forEach(meal => {
    document.getElementById('menu').innerHTML +=
    `<p>${meal}</p><p> * * * </p>`;
  });
};
//kielen valinta
let languageBool = true;
const printMenu = () => {
  languageBool = languageBool ? false : true;
  if(languageBool === false){
    printEngMenu();
  }
  if(languageBool === true){
    printFinMenu();
  }
};
//menun sorttaus
let sortBool = true;
const sortMenu = () => {
  document.getElementById('menu').innerHTML = '';
  sortBool = sortBool ? false : true;
  if(sortBool === false){
    coursesEn.sort();
    coursesFi.sort();
    if(languageBool === true){
      printFinMenu();
    }
    if(languageBool === false){
      printEngMenu();
    }
  }
  if(sortBool === true){
    coursesEn.reverse();
    coursesFi.reverse();
    if(languageBool === true){
      printFinMenu();
    }
    if(languageBool === false){
      printEngMenu();
    }
  }
};
//random sapuska
const randomMeal = () => {
  let food;
  document.getElementById('menu').innerHTML = '';
  if(languageBool === true){
    food = coursesFi[Math.floor(Math.random() * coursesFi.length)];
  }
  if(languageBool === false){
    food = coursesEn[Math.floor(Math.random() * coursesEn.length)];
  }
  document.getElementById('menu').innerHTML = '<br><p>RANDOM LOUNAS JUURI SINULLE!</p><p> * * * </p>'
  + `<p> ${food} </p><p> * * * </p>`;
};

printFinMenu();
document.getElementById('language').addEventListener('click', printMenu);
document.getElementById('sort').addEventListener('click', sortMenu);
document.getElementById('random').addEventListener('click', randomMeal);

