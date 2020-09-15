import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import Card from './Card';
import './style.css';
import DetailHeader from './DetailHeader';
import * as storage from '../services/localStorage';
import AppContext from '../contexts/AppContext';

function handleIniciarReceita(history, id) {
  const {
    location: { pathname },
  } = history;
  history.push(`${pathname}/in-progress`);

  const LS = localStorage.getItem('inProgressRecipes');
  
  if (!LS && pathname.includes('bebidas')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { [id]: [] }, meals: {} }),
    );
  } else if (!LS && pathname.includes('comidas')) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { [id]: [] }, cocktails: {} }),
    );
  } else if (LS && pathname.includes('bebidas')) {
    const toEdit = JSON.parse(LS);
    toEdit.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  } else if (LS && pathname.includes('comidas')) {
    const toEdit = JSON.parse(LS);
    toEdit.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};
function Details({ Meal, details, recom, ingredientsList }) {
  const { setLiked } = useContext(AppContext);
  const [DIS, setDIS] = useState(false);
  const [IP, setIP] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      setDIS(doneRecipes.some((data) => data.id === id));
    }

    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      if (history.location.pathname.includes('comidas')) {
        const testArr = Object.keys(inProgress.meals);
        setIP(testArr.some((data) => data === id));
      }
      if (history.location.pathname.includes('bebidas')) {
        const testArr = Object.keys(inProgress.cocktails);
        setIP(testArr.some((data) => data === id));
      }
    }

    storage.favoriteLS(id, setLiked);
  }, []);

  return (
    <div>
      <div>
        <DetailHeader Meal={Meal} details={details} />
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
          className={DIS ? 'hidden' : ''}
          onClick={() => handleIniciarReceita(history, id)}
        >
          {' '}
          {IP ? 'Continuar Receita' : 'Iniciar receita'}
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
