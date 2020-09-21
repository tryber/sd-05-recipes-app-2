import React from 'react';
import PropTypes from 'prop-types';
import './details.css';
import ShLiButton from './ShareLikeButtons';

function DetailHeader({ Meal, details }) {
  return (
    <div>
      <div className="header-pic" style={{
        backgroundImage: `url(${Meal ? details.strMealThumb : details.strDrinkThumb})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      </div>
      <div className="details-header">
        <div className="title-side">
          <h2 className="det-title" data-testid="recipe-title">
            {Meal ? details.strMeal : details.strDrink}
          </h2>
          <h5 className="det-subtitle" data-testid="recipe-category">
            {details.strCategory} {!Meal ? `- ${details.strAlcoholic}` : ''}
          </h5>
        </div>
      </div>
      <ShLiButton />
    </div >
  );
}

export default DetailHeader;

DetailHeader.propTypes = {
  Meal: PropTypes.bool.isRequired,
  details: PropTypes.objectOf(PropTypes.object).isRequired,
};
