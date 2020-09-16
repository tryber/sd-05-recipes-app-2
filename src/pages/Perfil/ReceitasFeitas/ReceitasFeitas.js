import React, { useState }  from 'react';
import Header from '../../../components/Header';
import HCard from '../../../components/HorizontalCard';

// pegar as receitas feitas do local storage ok
// e se não tiver nada no localstorage = array vazio
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

// mepear cards (card comum para favs/feitas)
// clicar no card leva pro detalhes
// comida: card deve ter 2 tags de categoria
// bebida: card deve dizer se é alcoolica ou não
// botão de compartilhar copia url
export default function ReceitasFeitas() {
  const [filters, setFilters] = useState(doneRecipes);
  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={() => setFilters(doneRecipes)}
        >
          Todas
        </button>
        <button
          data-testid="filter-by-food-btn"
          onClick={() => setFilters(doneRecipes.filter((recipe) => recipe.type === 'comida'))}
        >
          Comidas
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={() => setFilters(doneRecipes.filter((recipe) => recipe.type === 'bebida'))}
        >
          Bebidas
        </button>
      </div>
      <div>
        {filters.map((card, index) => (<HCard card={card} index={index} />))}
      </div>
    </div>
  );
}