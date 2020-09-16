import React from 'react';
import Header from '../../../components/Header';

// pegar as receitas feitas do local storage ok
// falta: e se não tiver nada no localstorage?
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

// mepear as receitas feitas em cards (usar componente card??)
function mapDoneRecipes() {
  doneRecipes.map(() => ())
}

// comida: card deve ter 2 tags de categoria
// bebida: card deve dizer se é alcoolica ou não
// botão de compartilhar copia url
// filtros: food, drinks, all
// clicar no card leva pro detalhes
function ReceitasFeitas() {
  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn">Todas</button>
        <button data-testid="filter-by-food-btn">Comidas</button>
        <button data-testid="filter-by-drink-btn">Bebidas</button>
      </div>
      <div>
        {mapDoneRecipes()}
      </div>
    </div>

  );
}

export default ReceitasFeitas;
