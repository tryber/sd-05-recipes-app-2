import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../services/api';
import AppContext from '../contexts/AppContext';

function getAPIByFilter(ing, type, location, setResults) {
  console.log('entrei aqui no getAPI');
  console.log(location.pathname);
    if (location.pathname === '/') {
      console.log('entrei aqui no if');
      switch  (type) {
        case 'ingredient':
          api.byMealIngredient(ing).then((data) => setResults(data.meals));
          return true;
        case 'name':
          return setResults(api.byMealName(ing));
        case 'first-letter':
          return ing.length > 1 ? alert('Sua busca deve conter somente 1 (um) caracter') : setResults(api.byMealFirstLetter(ing));
        default:
          return false;
      }
    }
    if (location === '/bebidas') {
      switch  (type) {
        case 'ingredient':
          return setResults(api.byDrinkIngredient(ing));
        case 'name':
          return setResults(api.byDrinkName(ing));
        case 'first-letter':
          return ing.length > 1 ? alert('Sua busca deve conter somente 1 (um) caracter') : setResults(api.byDrinkFirstLetter(ing));
        default:
          return false;
      }
    }
  }

export default function SearchBar() {
  const history = useHistory();
  const { searchBarOn } = useContext(AppContext);
  const [ingredientName, setIngredientName] = useState('');
  const [radioFilter, setRadioFilter] = useState();
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(ingredientName);
    console.log(radioFilter);
    console.log(results);
  }, [ingredientName, radioFilter, results]);

  // useEffect(() => {
  //   getAPIByFilter(ingredientName, radioFilter, history);
  // }, []);


  if (!searchBarOn) {
    return (
      <div>
        <input data-testid="search-input" onChange={(e) => setIngredientName(e.target.value)} />
        <input type="radio" name="filter" value="ingredient" data-testid="ingredient-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Ingrediente
        <input type="radio" name="filter" value="name" data-testid="name-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Nome
        <input type="radio" name="filter" value="first-letter" data-testid="first-letter-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Primeira letra
        <button data-testid="exec-search-btn" onClick={() =>
          getAPIByFilter(ingredientName, radioFilter, history.location, setResults)}>Buscar
        </button>
        {results.map((result) => <p>{result.strMeal}</p>)}
      </div>
    )
  } 
 
  return (
    <div>
      <button>fica</button>
    </div>
  )
}
