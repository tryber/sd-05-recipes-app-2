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
      <button data-testid="drinks-bottom-btn" onClick={() => history.push('/bebidas')} src={drinks}>
        <img alt="drinks" className="nav-icon" src={drinks} />
      </button>
      <button onClick={() => history.push('/explorar')}>
        <img alt="explorar" className="nav-icon" data-testid="explore-bottom-btn" src={explore} />
      </button>
      <button onClick={() => history.push('/comidas')}>
        <img alt="comidas" className="nav-icon" data-testid="food-bottom-btn" src={meal} />
      </button>
    </div>
  );
}
