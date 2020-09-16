import { lowerCase, upperCase } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import AppContext from '../../contexts/AppContext';
import * as api from '../../services/api';

export default function ExplorarIngredientes() {
  const history = useHistory();
  const { filteredData, setFilteredData, Meal, setMeal } = useContext(AppContext);
  const [list, setList] = useState([]);
  const urlMeal = (item) =>
    `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`;
  const urlDrink = (item) =>
    `https://www.thecocktaildb.com/images/ingredients/${lowerCase(item.strIngredient1)}-Small.png`;

  useEffect(() => {
    if (history.location.pathname === '/explorar/comidas/ingredientes') {
      api.mealListIng().then((data) => setList(data.meals));
      setMeal(true);
    }
    if (history.location.pathname === '/explorar/bebidas/ingredientes') {
      api.drinkListIng().then((data) => setList(data.drinks));
      setMeal(false);
    }
  }, [])

  if (list.length === 0) return <Loading />
  return (
    <div>
      <Header />
      {list.filter((ing, i) => i < 12).map((item, i) =>
        <button
          data-testid={`${i}-ingredient-card`}
          className='card-rec'
        >
          <div className="card">
            <img
              src={Meal ? urlMeal(item) : urlDrink(item)}
              alt={Meal ? item.strIngredient : item.strIngredient1}
              className="card-image-top"
              data-testid={`${i}-card-img`}
            />
            <div className="card-body card-description">
              <p
                className="card-title d-flex flex-column justify-content-end align-items-center"
                data-testid={`${i}-card-name`}
              >
                {Meal ? item.strIngredient : item.strIngredient1}
              </p>
            </div>
          </div>
        </button>
      )}
      <Footer />
    </div>
  );
}
