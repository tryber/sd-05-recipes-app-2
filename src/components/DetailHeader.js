import React from 'react';
import PropTypes from 'prop-types';
import ShLiButton from './ShareLikeButtons';

function DetailHeader({ Meal, details }) {
  return (
    <div>
      <img
        alt={Meal ? details.strMeal : details.strDrink}
        data-testid="recipe-photo"
        src={Meal ? details.strMealThumb : details.strDrinkThumb}
      />
      <h2 data-testid="recipe-title">{Meal ? details.strMeal : details.strDrink}</h2>
      <h4 data-testid="recipe-category">
        {details.strCategory} {!Meal ? `- ${details.strAlcoholic}` : ''}
      </h4>
      <ShLiButton />
    </div>
  );
}

export default DetailHeader;

DetailHeader.propTypes = {
  Meal: PropTypes.bool.isRequired,
  details: PropTypes.objectOf(PropTypes.object).isRequired,
};
