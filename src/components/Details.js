import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Card from './Card';

function share(Meal, details, setCopied) {
  let textField;
  if (Meal) {
    const copyLink = `http://localhost:3000/comidas/${details.idMeal}`;
    textField = document.createElement('textarea');
    textField.innerText = copyLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  } else {
    const copyLink = `http://localhost:3000/bebidas/${details.idDrink}`;
    textField = document.createElement('textarea');
    textField.innerText = copyLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 5000);
}

function handleIniciarReceita(history) {
  history.push(`${history.location.pathname}/in-progress`);
}

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};
function Details({ Meal, details, recom, ingredientsList }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  return (
    <div className="details-page">
      <img
        className="header-pic"
        alt={Meal ? details.strMeal : details.strDrink}
        data-testid="recipe-photo"
        src={Meal ? details.strMealThumb : details.strDrinkThumb}
      />
      <div className="details-header">
        <div className="title-side">
          <h2 data-testid="recipe-title">{Meal ? details.strMeal : details.strDrink}</h2>
          <h5 data-testid="recipe-category">
            {details.strCategory} {!Meal ? `- ${details.strAlcoholic}` : ''}
          </h5>
        </div>
        <div className="icon-side">
          <img alt="favorite button" data-testid="favorite-btn" src={whiteHeartIcon} />
          <button className="det-btn" data-testid="share-btn" onClick={() => share(Meal, details, setCopied)}>
            <img alt="share button" src={shareIcon} /> {copied && <span>Link <br/> copiado!</span>}
          </button>
        </div>
      </div>
      <div className="details-body">
        {ingredientsList(details)}
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
        <h3>Vídeo</h3>
        <video width="320" height="240" controls>
          <source data-testid="video" src={details.strYoutube} type="video/mp4" />
        </video>
        <h3>Recomendadas</h3>
        {recom.map((each, index) => (
          <Card
            description={Meal ? each.strDrink : each.strMeal}
            thumb={Meal ? each.strDrinkThumb : each.strMealThumb}
            id={Meal ? `bebidas ${each.idDrink}` : `comidas ${each.idMeal}`}
            i={index}
            rec
          />
        ))}
        <button
          style={style}
          data-testid="start-recipe-btn"
          onClick={() => handleIniciarReceita(history)}
        >
          {' '}
          Iniciar receita
        </button>
      </div>
    </div>
  );
}

export default Details;

Details.propTypes = {
  Meal: PropTypes.bool.isRequired,
  details: PropTypes.objectOf(PropTypes.object).isRequired,
  recom: PropTypes.arrayOf(PropTypes.object).isRequired,
  ingredientsList: PropTypes.func.isRequired,
};
