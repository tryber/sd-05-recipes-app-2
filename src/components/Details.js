import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import goBack from '../images/go-back.svg';
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

function Details({ Meal, details, recom, ingredientsList }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    if (Meal) {
      history.push('/comidas');
    } else {
      history.push('/bebidas');
    }
  }

  return (
    <div className="details-page">
      <button className="back-button" onClick={() => handleClick()}>
        <img src={goBack} alt="Voltar" height="40px"/>
      </button>
      <img
        className="header-pic"
        alt={Meal ? details.strMeal : details.strDrink}
        data-testid="recipe-photo"
        src={Meal ? details.strMealThumb : details.strDrinkThumb}
      />
      <div className="details-header">
        <div className="title-side">
          <h2 className="det-title" data-testid="recipe-title">
            {Meal ? details.strMeal : details.strDrink}
          </h2>
          <h5 data-testid="recipe-category" className="det-subtitle">
            {details.strCategory} {!Meal ? `- ${details.strAlcoholic}` : ''}
          </h5>
        </div>
        <div className="icon-side">
          <img alt="favorite button" data-testid="favorite-btn" src={whiteHeartIcon} />
        </div>
      </div>
      <div className="details-body">
        <button
          className="det-btn" data-testid="share-btn"
          onClick={() => share(Meal, details, setCopied)}
        >
          <img alt="share button" src={shareIcon} /> {copied && <span>Link copiado!</span>}
        </button>
        {ingredientsList(details)}
        <h4 className="topic-title">Instructions</h4>
        <p data-testid="instructions">{details.strInstructions}</p>
        <h4 className="topic-title">Vídeo</h4>
        <video width="300" height="240" controls>
          <source data-testid="video" src={details.strYoutube} type="video/mp4" />
        </video>
        <h4 className="topic-title">Recomendadas</h4>
        <div className="card-container">
          {recom.map((each, index) => (
            <Card
              description={Meal ? each.strDrink : each.strMeal}
              thumb={Meal ? each.strDrinkThumb : each.strMealThumb}
              id={Meal ? `bebidas ${each.idDrink}` : `comidas ${each.idMeal}`}
              i={index}
              rec
            />
            ))}
        </div>
        <button
          className="start-btn"
          data-testid="start-recipe-btn"
          onClick={() => handleIniciarReceita(history)}
        >
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
