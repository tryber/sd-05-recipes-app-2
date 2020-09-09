import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as api from '../../services/api';

function Comidas() {
  const [defaultMeals, setDefaultMeals] = useState([]);
  useEffect(() => {
    api.defaultMeals().then((data) => setDefaultMeals(data.meals));
  }, []);

  console.log(defaultMeals);

  return (
    <div>
      {/* <Header /> */}
      <div className="d-flex flex-row flex-wrap justify-content-around">
        {defaultMeals.map((meal, index) => (
          <Card
            thumb={meal.strMealThumb}
            description={meal.strMeal}
            i={index}
          />
        ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Comidas;
