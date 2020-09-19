export const mockSuccessCatFood = Promise.resolve({
  meals: [
    {
      strCategory: 'Beef',
    },
    {
      strCategory: 'Breakfast',
    },
    {
      strCategory: 'Chicken',
    },
    {
      strCategory: 'Dessert',
    },
    {
      strCategory: 'Goat',
    },
    {
      strCategory: 'Lamb',
    },
    {
      strCategory: 'Miscellaneous',
    },
    {
      strCategory: 'Pasta',
    },
    {
      strCategory: 'Pork',
    },
    {
      strCategory: 'Seafood',
    },
    {
      strCategory: 'Side',
    },
    {
      strCategory: 'Starter',
    },
    {
      strCategory: 'Vegan',
    },
    {
      strCategory: 'Vegetarian',
    },
  ],
});

export const mockSuccessCatDrink = Promise.resolve({
  drinks: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Milk / Float / Shake',
    },
    {
      strCategory: 'Other/Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
    {
      strCategory: 'Shot',
    },
    {
      strCategory: 'Coffee / Tea',
    },
    {
      strCategory: 'Homemade Liqueur',
    },
    {
      strCategory: 'Punch / Party Drink',
    },
    {
      strCategory: 'Beer',
    },
    {
      strCategory: 'Soft Drink / Soda',
    },
  ],
});

export const mockIngredChicken = Promise.resolve({
  meals: [
    {
      strMeal: 'Brown Stew Chicken',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
      idMeal: '52940'
    },
    {
      strMeal: 'Chicken & mushroom Hotpot',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
      idMeal: '52846'
    },
    {strMeal: 'Chicken Alfredo Primavera',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
      idMeal: '52796'
    },
    {strMeal: 'Chicken Basquaise',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg',
      idMeal: '52934'
    },
    {strMeal: 'Chicken Congee',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
      idMeal: '52956'
    },
    {strMeal: 'Chicken Handi',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
      idMeal: '52795'
    },
    {
      strMeal: 'Kentucky Fried Chicken',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg',
      idMeal: '52813'
    },
    {strMeal: 'Kung Pao Chicken',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
      idMeal: '52945'
    },
    {
      strMeal: 'Pad See Ew',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
      idMeal: '52774'
    },
    {
      strMeal: 'Thai Green Curry',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
      'idMeal':'52814'
    },
  ],
})
export const mockNameSoup = Promise.resolve(require('../../cypress/mocks/soupMeals'));
export const mockA = Promise.resolve(require('../../cypress/mocks/oneMeal'));

export const mockIngredLemon = Promise.resolve(require('../../cypress/mocks/drinksByIngredient'));
export const mockNameGin = Promise.resolve(require('../../cypress/mocks/ginDrinks'));
export const mockADrink = Promise.resolve(require('../../cypress/mocks/oneDrink'));

export const mockBeefMeals = Promise.resolve(require('../../cypress/mocks/beefMeals'));
export const mockBreakFMeals = Promise.resolve(require('../../cypress/mocks/breakfastMeals'));
export const mockChickMeals = Promise.resolve(require('../../cypress/mocks/chickenMeals'));
export const mockDessertMeals = Promise.resolve(require('../../cypress/mocks/dessertMeals'));
export const mockGoatMeals = Promise.resolve(require('../../cypress/mocks/goatMeals'));

export const mockOrdinaryDrink = Promise.resolve(require('../../cypress/mocks/ordinaryDrinks'));
export const mockCocktailDrink = Promise.resolve(require('../../cypress/mocks/cocktailDrinks'));
export const mockMilkDrink = Promise.resolve(require('../../cypress/mocks/milkDrinks'));
export const mockOtherDrink = Promise.resolve(require('../../cypress/mocks/otherDrinks'));
export const mockCocoaDrink = Promise.resolve(require('../../cypress/mocks/cocoaDrinks'));

export const mockMeals = Promise.resolve(require('../../cypress/mocks/meals'));
export const mockDrinks = Promise.resolve(require('../../cypress/mocks/drinks'));
