import React from 'react';
import { useHistory } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';

const style = {
  position: 'fixed',
  bottom: 0,
};

export default function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" style={style}>
      <button onClick={() => history.push('/bebidas')}>
        <img data-testid="drinks-bottom-btn" alt="drinks" src={drinks} />
      </button>
      <button onClick={() => history.push('/explorar')}>
        <img data-testid="explore-bottom-btn" alt="explorar" src={explore} />
      </button>
      <button onClick={() => history.push('/comidas')}>
        <img alt="comidas" data-testid="food-bottom-btn" src={meal} />
      </button>
    </div>
  );
}
