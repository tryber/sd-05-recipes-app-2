import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as api from '../../services/api';
import { useHistory } from 'react-router-dom';

function Comidas() {
  const history = useHistory();
  const [defaultCards, setDefaultCards] = useState([]);
  const [mealBool, setMealBool] = useState([false]);

  useEffect(() => {
    if (history.location.pathname == '/comidas') {
      setMealBool(true);
      api.defaultMeals().then((data) => setDefaultCards(data.meals));
    } else {
      setMealBool(false);
      api.defaultDrinks().then((data) => setDefaultCards(data.drinks));
    }
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <div className="d-flex flex-row flex-wrap justify-content-around">
        {defaultCards
          .filter((data, index) => {
            if (index < 12) return data;
          })
          .map((card, index) => (
            <Card
              thumb={mealBool ? card.strMealThumb : card.strDrinkThumb}
              description={mealBool ? card.strMeal : card.strDrink}
              i={index}
            />
          ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Comidas;
