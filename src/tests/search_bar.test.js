import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Header from '../components/Header';
import App from '../App';
import Home from '../pages/Home/Home';
import SearchBar from '../components/SearchBar';
import * as mockAPI from './mockAPI';

jest.spyOn(api, 'mealCategories').mockImplementation(() => mockAPI.mockSuccessCatFood);
jest.spyOn(api, 'drinkCategories').mockImplementation(() => mockAPI.mockSuccessCatDrink);
jest.spyOn(api, 'byMealIngredient').mockImplementation(() => mockAPI.mockIngredChicken);
jest.spyOn(api, 'byMealName').mockImplementation(() => mockAPI.mockNameSoup);
jest.spyOn(api, 'byMealFirstLetter').mockImplementation(() => mockAPI.mockA);
jest.spyOn(api, 'byDrinkIngredient').mockImplementation(() => mockAPI.mockIngredLemon);
jest.spyOn(api, 'byDrinkName').mockImplementation(() => mockAPI.mockNameGin);
jest.spyOn(api, 'byDrinkFirstLetter').mockImplementation(() => mockAPI.mockADrink);

describe('Deve ter uma seção de botões para filtrar por categorias', () => {
  it('Tela de comida deve ter categorias e data-test-ids corretos', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
      { route: '/comidas' }
    );
    
    await waitFor(() => expect(api.mealCategories).toHaveBeenCalled());

    expect(getByTestId('All-category-filter')).toBeInTheDocument();
    expect(getByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(getByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(getByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(getByTestId('Goat-category-filter')).toBeInTheDocument();
  });
  it('Tela de bebida deve ter categorias e data-test-ids corretos', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
      { route: '/bebidas' }
    );
    
    await waitFor(() => expect(api.drinkCategories).toHaveBeenCalled());

    expect(getByTestId('All-category-filter')).toBeInTheDocument();
    expect(getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    expect(getByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(getByTestId('Milk / Float / Shake-category-filter')).toBeInTheDocument();
    expect(getByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(getByTestId('Cocoa-category-filter')).toBeInTheDocument();
  })
})

import { waitFor } from '@testing-library/react';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as api from '../services/api';
jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a barra de busca', () => {
  it('Data-test-ids devem estar na tela ao clicar na lupa', async () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    const ingredRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetRadio = getByTestId('first-letter-search-radio');
    const searchBtn = getByTestId('exec-search-btn');
    
    expect(inputSearch).toBeInTheDocument();
    expect(ingredRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('A barra de busca deve mudar a forma como serão filtradas as receitas de comida', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'chicken' }});
    const ingredRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealIngredient).toHaveBeenCalled());
  })

  it('Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'soup' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealName).toHaveBeenCalled());
  });
  it('Se o radio selecionado for Primeira Letra, a busca na API é feita corretamente pela primeira letra', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'a' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealFirstLetter).toHaveBeenCalled());
  });
  // it('Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
  //   const { getByTestId, getByRole } = renderWithRouter(
  //     <Provider>
  //       <Home />
  //     </Provider>,
  //     { route: '/comidas' }
  //   );

  //   await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
  //   const searchIcon = getByTestId('search-top-btn');
  //   fireEvent.click(searchIcon);

  //   const inputSearch = getByTestId('search-input');
  //   fireEvent.change(inputSearch, { target: { value: 'aaa' }});
  //   const firstLetRadio = getByTestId('first-letter-search-radio');
  //   fireEvent.click(firstLetRadio);
  //   const searchBtn = getByTestId('exec-search-btn');
  //   fireEvent.click(searchBtn);
  //   const alert = getByRole('alert');
  //   console.log(alert);
  //   expect(getByRole('alert')).toBeInTheDocument();
  // });
})

describe('A barra de busca deve mudar a forma como serão filtradas as receitas de bebida', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'lemon' }});
    const ingredRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byDrinkIngredient).toHaveBeenCalled());
  })

  it('Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );

    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'gin' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byDrinkName).toHaveBeenCalled());
  });
  it('Se o radio selecionado for Primeira Letra, a busca na API é feita corretamente pela primeira letra', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );

    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'a' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byDrinkFirstLetter).toHaveBeenCalled());
  });
  // it('Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
  //   const { getByTestId, getByRole } = renderWithRouter(
  //     <Provider>
  //       <Home />
  //     </Provider>,
  //     { route: '/comidas' }
  //   );

  //   await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
  //   const searchIcon = getByTestId('search-top-btn');
  //   fireEvent.click(searchIcon);

  //   const inputSearch = getByTestId('search-input');
  //   fireEvent.change(inputSearch, { target: { value: 'aaa' }});
  //   const firstLetRadio = getByTestId('first-letter-search-radio');
  //   fireEvent.click(firstLetRadio);
  //   const searchBtn = getByTestId('exec-search-btn');
  //   fireEvent.click(searchBtn);
  //   const alert = getByRole('alert');
  //   console.log(alert);
  //   expect(getByRole('alert')).toBeInTheDocument();
  // });
})