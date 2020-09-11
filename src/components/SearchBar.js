import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../services/api';
import AppContext from '../contexts/AppContext';

function filterAPIComidas(ing, type, setResults) {
  switch (type) {
    case 'ingredient':
      api.byMealIngredient(ing).then((data) => setResults(data.meals));
      return true;
    case 'name':
      api.byMealName(ing).then((data) => setResults(data.meals));
      return true;
    case 'first-letter':
      return (ing.length > 1 ?
        alert('Sua busca deve conter somente 1 (um) caracter') :
        (api.byMealFirstLetter(ing).then((data) => setResults(data.meals)))
      );
    default:
      return false;
  }
}

function filterAPIBebidas(ing, type, setResults) {
  switch (type) {
    case 'ingredient':
      api.byDrinkIngredient(ing).then((data) => setResults(data.drinks));
      return true;
    case 'name':
      api.byDrinkName(ing).then((data) => setResults(data.drinks));
      return true;
    case 'first-letter':
      return (ing.length > 1 ?
        alert('Sua busca deve conter somente 1 (um) caracter') :
        (api.byDrinkFirstLetter(ing).then((data) => setResults(data.drinks)))
      );
    default:
      return false;
  }
}

// INPUTS RADIO BUTTON
const radiosBtn = (radioFilter) => {
  const radios = [
    { filterValue: 'ingredient', dataTestID: 'ingredient-search-radio', title: 'Ingrediente' },
    { filterValue: 'name', dataTestID: 'name-search-radio', title: 'Nome' },
    { filterValue: 'first-letter', dataTestID: 'first-letter-search-radio', title: 'Primeira Letra' },
  ];
  return (
    <div>
      {radios.map((radio) =>
        <div key={radio.filterValue}>
          <input
            type="radio"
            name="filter"
            value={radio.filterValue}
            data-testid={radio.dataTestID}
            onClick={(e) => radioFilter(e.target.value)}
          />{radio.title}
        </div>,
      )}
    </div>
  );
};

// LÓGICA CASO SÓ TENHA 1 RESPOSTA OU NENHUMA CONSIDERANDO OS FILTROS APLICADOS
const resultValidation = (history, filteredData) => {
  if (filteredData === null) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (filteredData.length === 1 && filteredData !== null && history.location.pathname === '/comidas') {
    console.log(filteredData);
    history.push(`/comidas/${filteredData[0].idMeal}`);
  }
  if (filteredData.length === 1 && filteredData !== null && history.location.pathname === '/bebidas') {
    console.log(filteredData);
    return history.push(`/bebidas/${filteredData[0].idDrink}`);
  }
  return true;
};

// COMPONENTE SEARCHBAR
export default function SearchBar() {
  const history = useHistory();
  const { searchBarOn, filteredData, setFilteredData } = useContext(AppContext);
  const [ingredientName, setIngredientName] = useState('');
  const [radioFilter, setRadioFilter] = useState();

  useEffect(() => {
    resultValidation(history, filteredData);
  }, [filteredData]);

  const handleClick = () => {
    const pathname = history.location.pathname;
    if (pathname === '/comidas') return filterAPIComidas(ingredientName, radioFilter, setFilteredData);
    if (pathname === '/bebidas') return filterAPIBebidas(ingredientName, radioFilter, setFilteredData);
    return true;
  };

  if (searchBarOn) {
    return (
      <div>
        <input data-testid="search-input" onChange={(e) => setIngredientName(e.target.value)} />
        {radiosBtn(setRadioFilter)}
        <button data-testid="exec-search-btn" onClick={() => handleClick()}>
          Buscar
        </button>
      </div>
    );
  }
  return <FilterButtons />;
}

// COMPONENT FILTERBUTTONS
export function FilterButtons() {
  const history = useHistory();
  const { setSelecCategory } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const handleCat = (e) => setSelecCategory(e.target.value);

  useEffect(() => {
    if (history.location.pathname === '/comidas') {
      api.mealCategories().then((data) => setCategories(data.meals));
    }
    if (history.location.pathname === '/bebidas') {
      api.drinkCategories().then((data) => setCategories(data.drinks));
    }
  }, []);

  return (
    <div>
      <button value={'All'}>All</button>
      {categories.filter((cat, i) => i < 5).map((cat) =>
        <div key={cat.id}>
          <button
            data-testid={`${cat.strCategory}-category-filter`}
            value={cat.strCategory}
            onClick={(e) => handleCat(e)}
          >{cat.strCategory}</button>
        </div>,
      )}
    </div>
  );
}
