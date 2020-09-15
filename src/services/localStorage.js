export function favoriteLS(id, setLiked) {
  const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favLS) {
    const teste = favLS.some((data) => data.id === id);
    if (teste) {
      setLiked(true);
    }
  }
}

export function inProgressLS(id, history) {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const starterObj = {
    cocktails: {},
    meals: {},
  };

  const historico = starterLS(history, id, LS);

  const LSIP = localStorage.getItem('inProgressRecipes');
  if (!LSIP && history.location.pathname.includes('bebidas')) {
    starterObj.cocktails = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(starterObj));
  } else if (!LSIP && history.location.pathname.includes('comidas')) {
    starterObj.meals = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(starterObj));
  }

  if (LSIP && history.location.pathname.includes('bebidas')) {
    const toEdit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    toEdit.cocktails[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  } else if (LSIP && history.location.pathname.includes('comidas')) {
    const toEdit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    toEdit.meals[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}

export function starterLS(history, id, LS) {
  let historico = [];
  if (LS && history.location.pathname.includes('comidas')) {
    historico = LS.meals[id];
  } else if (LS && history.location.pathname.includes('bebidas')) {
    historico = LS.cocktails[id];
  }
  return historico;
}

export function setNewFavLS(Meal, details) {
  const newFav = {
    id: Meal ? details.idMeal : details.idDrink,
    type: Meal ? 'comida' : 'bebida',
    area: Meal ? details.strArea : '',
    category: details.strCategory,
    alcoholicOrNot: Meal ? '' : details.strAlcoholic,
    name: Meal ? details.strMeal : details.strDrink,
    image: Meal ? details.strMealThumb : details.strDrinkThumb,
  };
  const historico = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!historico) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFav]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...historico, newFav]));
  }
}
