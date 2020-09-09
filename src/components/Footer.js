import React from 'react';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import { useHistory } from 'react-router-dom';

export default function FOOTER() {
  const history = useHistory();
  return (
    <div data-testid="footer">
      <button data-testid="drinks-bottom-btn" onClick={() => history('/bebidas')}>
        <img alt="drinks" src={drinks} />
      </button>
      <button data-testid="explore-bottom-btn" onClick={() => history('/explorar')}>
        <img alt="explorar" src={explore} />
      </button>
      <button data-testid="food-bottom-btn" onClick={() => history('/comidas')}>
        <img alt="comidas" src={meal} />
      </button>
    </div>
  );
}
