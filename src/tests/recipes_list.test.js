import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { waitFor } from '@testing-library/react';
import Home from '../pages/Home/Home';
import Provider from '../contexts/Provider';
import * as api from '../services/api';

export const mockSuccessFood = Promise.resolve({
  meals: [
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Corba',
      strMealThumb:
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
  ],
});

export const mockSuccessDrink = Promise.resolve({
  drinks: [
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      strDrink: 'GG',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
  ],
});

export const fetchMock = Promise.resolve({
  json: () => mockSuccess,
});

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);

describe('Home tests em /comida', () => {
  test('Renderiza os 12 cards', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' },
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());

    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`1-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`2-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`3-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`4-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`5-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`6-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`7-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`8-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`9-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`10-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`11-recipe-card`)).toBeInTheDocument();

    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
  });
});

describe('Home tests em /bebida', () => {
  test('Renderiza os 12 cards', async () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' },
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());

    expect(getByTestId(`0-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`1-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`2-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`3-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`4-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`5-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`6-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`7-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`8-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`9-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`10-recipe-card`)).toBeInTheDocument();
    expect(getByTestId(`11-recipe-card`)).toBeInTheDocument();

    const totalCards = getAllByTestId(/recipe-card/i);
    expect(totalCards.length).toBe(12);
  });
});
