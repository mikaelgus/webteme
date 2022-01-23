
const menu = document.querySelector('.menu');

let courses = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
];

/**
 * Validating courses names
 */
const validateMeal = () => {
  courses.forEach((meal) => {
    let name = meal.name;
    console.log('Validating: ', name, ' == ', (/^[A-ZÖÄÅ]{1}[a-zöäå0-9 -/(),.;:]{4,64}$/.test(name)));
  });
};
validateMeal();

/**
 * Sorting menu by price
 */
let sortByPrice = courses.sort((a, b) => {
  return a.price - b.price;
});
console.log(sortByPrice);

/**
 * Print menu under 5€ to console
 */
const filterMenu = () => {
  courses.forEach((meal) => {
    if(meal.price < 5){
      console.log(meal.name, ' ', meal.price);
    }
  });
};
filterMenu();

const raisePrice = () => {
  const newPrices = courses.map(meal => meal.price * 1.15);
  console.log('uudet hinnat', newPrices);
};
raisePrice();

const redusePrices = () => {
  const prices = courses.map(meal => meal.price);
  const reduseSum = prices.reduce((acc, current) => acc + current);
  console.log('Total sum: ', reduseSum);
};
redusePrices();

/**
 * Printing menu
 */
const printMenu = () => {
  document.getElementById('menu').innerHTML = '';
  courses.forEach((meal) => {
    document.getElementById('menu').innerHTML +=
    `<p>${meal.name}</p>
    <p>${meal.price} €</p>
    <p> * * * </p>`;
  });
};

printMenu();


