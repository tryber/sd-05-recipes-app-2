export function favoriteLS(id, setLiked) {
  const favLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favLS) {
    const teste = favLS.some((data) => data.id === id);
    if (teste) {
      setLiked(true);
    }
  }
}

export function inProgressLS(id, historico, pathname) {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const LSIP = localStorage.getItem('inProgressRecipes');
  if (!LSIP && pathname.includes('bebidas')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { [id]: [] }, meals: {} }),
    );
  }
  if (!LSIP && pathname.includes('comidas')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { [id]: [] }, cocktails: {} }),
    );
  }

  if (LSIP && pathname.includes('bebidas')) {
    const toEdit = JSON.parse(LS);
    toEdit.cocktails[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
  if (LSIP && pathname.includes('comidas')) {
    const toEdit = JSON.parse(LS);
    toEdit.meals[id] = historico;
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}
