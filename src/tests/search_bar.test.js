import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Header from '../components/Header';
import App from '../App';
import Home from '../pages/Home/Home';
import SearchBar from '../components/SearchBar';

const mockSuccessCatFood = Promise.resolve({
  meals: [
    {
      strCategory: "Beef"
    },
    {
      strCategory:"Breakfast"
    },
    {
      strCategory:"Chicken"
    },
    {
      strCategory:"Dessert"
    },
    {
      strCategory:"Goat"
    },
    {
      strCategory:"Lamb"
    },
    {
      strCategory:"Miscellaneous"
    },
    {
      strCategory:"Pasta"
    },
    {
      strCategory:"Pork"
    },
    {
      strCategory:"Seafood"
    },
    {
      strCategory:"Side"
    },
    {
      strCategory:"Starter"
    },
    {
      strCategory:"Vegan"
    },
    {
      strCategory:"Vegetarian"
    }
  ]
});

const mockSuccessCatDrink = Promise.resolve({
  drinks: [
    {
      strCategory: "Ordinary Drink"
    },
    {
      strCategory: "Cocktail"
    },
    {
      strCategory: "Milk \/ Float \/ Shake"
    },
    {
      strCategory: "Other\/Unknown"
    },
    {
      strCategory: "Cocoa"
    },
    {
      strCategory: "Shot"
    },
    {
      strCategory: "Coffee \/ Tea"
    },
    {
      strCategory: "Homemade Liqueur"
    },
    {
      strCategory: "Punch \/ Party Drink"
    },
    {
      strCategory: "Beer"
    },
    {
      strCategory: "Soft Drink \/ Soda"
    }
  ]
});

jest.spyOn(api, 'mealCategories').mockImplementation(() => mockSuccessCatFood);
jest.spyOn(api, 'drinkCategories').mockImplementation(() => mockSuccessCatDrink);

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
    const { history, getByTestId, getByRole, queryByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    // getToHome(getByTestId, getByRole);
    const pathname = history.location.pathname;
    expect(pathname).toEqual('/comidas');
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);
    const inputSearch = getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    const ingredRadio = getByTestId('ingredient-search-radio');
    expect(ingredRadio).toBeInTheDocument();
    const nameRadio = getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    const firstLetRadio = getByTestId('first-letter-search-radio');
    expect(firstLetRadio).toBeInTheDocument();
    const searchBtn = getByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
  })
})