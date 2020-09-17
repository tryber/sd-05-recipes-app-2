import React from 'react';
import { fireEvent } from '@testing-library/react';
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

describe('A barra de busca deve mudar a forma como serão filtradas as receitas', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente', async () => {
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
    fireEvent.change(inputSearch, { target: { value: 'chicken' }});
    const ingredRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealIngredient).toHaveBeenCalled());

    fireEvent.change(inputSearch, { target: { value: 'soup' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealName).toHaveBeenCalled());

    fireEvent.change(inputSearch, { target: { value: 'a' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadioRadio);
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealFirstLetter).toHaveBeenCalled());
  })
})
