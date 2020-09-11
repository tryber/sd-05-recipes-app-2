import React from 'react';
import { useHistory } from 'react-router-dom';
import './header.css';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <div className="navbar fixed-bottom footer-comp" data-testid="footer">
      <button data-testid="drinks-bottom-btn" onClick={() => history.push('/bebidas')}>
        <img alt="drinks" src={drinks} />
      </button>
      <button data-testid="explore-bottom-btn" onClick={() => history.push('/explorar')}>
        <img alt="explorar" src={explore} />
      </button>
      <button data-testid="food-bottom-btn" onClick={() => history.push('/comidas')}>
        <img alt="comidas" src={meal} />
      </button>
    </div>
  );
}
