import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../services/api';
import AppContext from '../contexts/AppContext';

function getAPIByFilter(ing, type, location, setResults) {
    if (location.pathname === '/comidas') {
      console.log('entrei aqui no if');
      switch  (type) {
        case 'ingredient':
          api.byMealIngredient(ing).then((data) => setResults(data.meals));
          return true;
        case 'name':
          api.byMealName(ing).then((data) => setResults(data.meals));
          return true;
        // case 'first-letter':
        //   return ing.length > 1 ? alert('Sua busca deve conter somente 1 (um) caracter') : (api.byMealFirstLetter(ing).then((data) => setResults(data.meals)));
        default:
          return false;
      }
    }
    if (location.pathname === '/bebidas') {
      console.log('entrei no if', ing);
      switch  (type) {
        case 'ingredient':
          console.log('entrei no case', ing, type);
          api.byDrinkIngredient(ing).then((data) => setResults(data.drinks));
          return true;
        case 'name':
          api.byDrinkName(ing).then((data) => setResults(data.drinks));
          return true;
        case 'first-letter':
          return ing.length > 1 ? alert('Sua busca deve conter somente 1 (um) caracter') : (api.byDrinkFirstLetter(ing).then((data) => setResults(data.drinks)));
        default:
          return false;
      }
    }
  }

export default function SearchBar() {
  const history = useHistory();
  const { searchBarOn, filteredData, setFilteredData } = useContext(AppContext);
  const [ingredientName, setIngredientName] = useState('');
  const [radioFilter, setRadioFilter] = useState();
  const [loading, setLoading] = useState(false);

  const divResultado = () => {
    if (loading) {
      return <p>Loading...</p>
    } else if (filteredData.length > 0) {
      return filteredData.map((result) => <p>{result.strMeal || result.strDrink}</p>)
    } else {
      return <p>Sem resultados</p>
    }
  }
  useEffect(() => {
    setLoading(false);
    console.log(filteredData);
  }, [filteredData]);

  if (searchBarOn) {
    return (
      <div>
        <input data-testid="search-input" onChange={(e) => setIngredientName(e.target.value)} />
        <input type="radio" name="filter" value="ingredient" data-testid="ingredient-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Ingrediente
        <input type="radio" name="filter" value="name" data-testid="name-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Nome
        <input type="radio" name="filter" value="first-letter" data-testid="first-letter-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Primeira letra
        <button data-testid="exec-search-btn" onClick={() => {setLoading(true);
          getAPIByFilter(ingredientName, radioFilter, history.location, setFilteredData)}}>Buscar
        </button>
        {divResultado()}
      </div>
    )
  } 
 
  return (
    <div>
      <button>fica</button>
    </div>
  )
}
