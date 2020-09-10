import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../services/api';
import AppContext from '../contexts/AppContext';

export default function SearchBar() {
  const history = useHistory();
  const { searchBarOn } = useContext(AppContext)
  const [ingredientName, setIngredientName] = useState('');
  const [radioFilter, setRadioFilter] = useState();

  useEffect(() => {
    console.log(ingredientName);
    console.log(radioFilter);
  }, [ingredientName, radioFilter]);

  if (searchBarOn) {
    return (
      <div>
        <input data-testid="search-input" onChange={(e) => setIngredientName(e.target.value)} />
        <input type="radio" name="filter" value="ingredient" data-testid="ingredient-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Ingrediente
        <input type="radio" name="filter" value="name" data-testid="name-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Nome
        <input type="radio" name="filter" value="first-letter" data-testid="first-letter-search-radio" onClick={(e) => setRadioFilter(e.target.value)} />Primeira letra
        <button data-testid="exec-search-btn">Buscar</button>
      </div>
    )
  } 
 
  return (
    <div>
      <button>fica</button>
    </div>
  )
}
