import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

function AllCards({ cards, Meal }) {
  return (
    <div className="d-flex flex-row flex-wrap justify-content-around">
      {cards
        .filter((data, index) => {
          if (index < 12) return data;
          return false;
        })
        .map((card, index) => (
          <Card
            thumb={Meal ? card.strMealThumb : card.strDrinkThumb}
            description={Meal ? card.strMeal : card.strDrink}
            i={index}
            key={Meal ? card.idMeal : card.idDrink}
            id={Meal ? `comidas ${card.idMeal}` : `bebidas ${card.idDrink}`}
          />
        ))}
    </div>
  );
}

export default AllCards;

AllCards.propTypes = {
  Meals: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};
