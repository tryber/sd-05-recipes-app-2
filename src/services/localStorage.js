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
  let historico = [];
  if (history.location.pathname.includes('comidas')) {
    if (LS) {
      historico = LS.meals[id];
    }
  }
  if (history.location.pathname.includes('bebidas')) {
    if (LS) {
      historico = LS.cocktails[id];
    }
  }

  const LSIP = localStorage.getItem('inProgressRecipes');
  if (!LSIP && history.location.pathname.includes('bebidas')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { [id]: [] }, meals: {} }),
    );
  }
  if (!LSIP && history.location.pathname.includes('comidas')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { [id]: [] }, cocktails: {} }),
    );
  }

  if (LSIP && history.location.pathname.includes('bebidas')) {
    const toEdit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    toEdit.cocktails[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
  if (LSIP && history.location.pathname.includes('comidas')) {
    const toEdit = JSON.parse(localStorage.getItem('inProgressRecipes'));
    toEdit.meals[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}
