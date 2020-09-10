import React from 'react';

export default function SearchBart() {
  return (
    <div>
      <div>
        <input data-testid="search-input" />
        <input type="radio" name="filter" value="ingridient" data-testid="ingredient-search-radio" />Ingrediente
        <input type="radio" name="filter" value="name" data-testid="name-search-radio" />Nome
        <input type="radio" name="filter" value="first-letter" data-testid="first-letter-search-radio" />Primeira letra
        <button data-testid="exec-search-btn">Buscar</button>
      </div>
      
    </div>
  )
}
