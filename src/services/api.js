const mealCategoriesEndpoint =
  "https://www.themealdb.com/api/json/v1/1/categories.php";
const defaultMealsEndpoint =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const drinkCategoriesEndpoint =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
const defaultDrinksEndpoint =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const generalAPIRequest = (URL) =>
  fetch(URL)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API", error));

export const mealCategories = () => generalAPIRequest(mealCategoriesEndpoint);
export const defaultMeals = () => generalAPIRequest(defaultMealsEndpoint);
export const drinkCategories = () => generalAPIRequest(drinkCategoriesEndpoint);
export const defaultDrinks = () => generalAPIRequest(defaultDrinksEndpoint);

//APIs Meals
//API de acesso às informações do Meal completas pelo ID
export const byMealId = (id) =>
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API Meals de id", error));

//API de acesso às informações do Meal completo por ingrediente
export const byMealIngredient = (ingredient) =>
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API Meals de ingrediente", error));

//API de acesso às informações do Meal completo por Nome
export const byMealName = (name) =>
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API Meals de nome", error));

//API de acesso às informações do Meal completo por Ingrediente
export const byMealFirstLetter = (firstLetter) =>
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstLetter}`)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) =>
      console.log("Erro na API Meals de primeira letra", error)
    );

//APIs Drinks
//API de acesso às informações do Drink completas pelo ID
export const byDrinkId = (id) =>
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API Drinks de id", error));

//API de acesso às informações do Drink completo por ingrediente
export const byDrinkIngredient = (ingredient) =>
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  )
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API Drinks de ingrediente", error));

//API de acesso às informações do Drink completo por Nome
export const byDrinkName = (name) =>
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) => console.log("Erro na API Drinks de nome", error));

//API de acesso às informações do Drink completo por Ingrediente
export const byDrinkFirstLetter = (firstLetter) =>
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
  )
    .then((response) =>
      response
        .json()
        .then((data) =>
          response.ok ? Promise.resolve(data) : Promise.reject(data)
        )
    )
    .catch((error) =>
      console.log("Erro na API Drinks de primeira letra", error)
    );
