import React from 'react';
import Header from '../../../components/Header';

// pegar as receitas feitas do local storage ok
// falta: e se não tiver nada no localstorage?
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

// mepear cards (card comum para favs/feitas)
// clicar no card leva pro detalhes
// comida: card deve ter 2 tags de categoria
// bebida: card deve dizer se é alcoolica ou não
// botão de compartilhar copia url
function mapDoneRecipes(filteredRecipes) {
  filteredRecipes.map(() => ())
}


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
        {mapDoneRecipes(filters)}
      </div>
    </div>
  );
}