import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import './details.css';
import './card.css';
// import Card from './Card';
import DetailHeader from './DetailHeader';
// import Header from './Header';
import Footer from './Footer';
import * as storage from '../services/localStorage';
import AppContext from '../contexts/AppContext';
import ControlledCarousel from './Carousel';

const startObj = {
  cocktails: {},
  meals: {},
};

function emptyLS(history, id) {
  if (history.location.pathname.includes('bebidas')) {
    startObj.cocktails = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startObj));
  } else if (history.location.pathname.includes('comidas')) {
    startObj.meals = { [id]: [] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startObj));
  }
}

function existingLS(history, id, LS) {
  if (history.location.pathname.includes('bebidas') && !LS.cocktails[id]) {
    const toEdit = JSON.parse(LS);
    toEdit.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  } else if (history.location.pathname.includes('comidas') && !LS.meals[id]) {
    const toEdit = JSON.parse(LS);
    toEdit.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(toEdit));
  }
}

function handleIniciarReceita(history, id) {
  history.push(`${history.location.pathname}/in-progress`);

  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!LS) {
    emptyLS(history, id);
  } else {
    existingLS(history, id, LS);
  }
}
/* consultado do 'https://www.w3schools.com/html/html_youtube.asp' e PR felipe */
const movie = (details) => {
  return (
    <div>
      <h4 className="topic-title">Vídeo</h4>
      <div className="video-container">
        <iframe
          width="300"
          height="240"
          data-testid="video"
          src={details.strYoutube && details.strYoutube.replace('watch?v=', 'embed/')}
        >
        </iframe>
      </div>
    </div>
  )
}

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
    setLiked(false);
    storage.favoriteLS(id, setLiked);
  }, []);

  return (
    <div>
      <div>
        <DetailHeader Meal={Meal} details={details} />
      </div>
      <div className="details-body">
        {ingredientsList(details)}
        <h4 className="topic-title">Instructions</h4>
        <p data-testid="instructions">{details.strInstructions}</p>
        {Meal && movie(details)}
        <h4 className="topic-title">Recomendadas</h4>
        <ControlledCarousel recom={recom} history={history} Meal={Meal} />
        {/* <div className="card-container">
          {recom.map((each, index) => (
            <Card
              description={Meal ? each.strDrink : each.strMeal}
              thumb={Meal ? each.strDrinkThumb : each.strMealThumb}
              id={Meal ? `bebidas ${each.idDrink}` : `comidas ${each.idMeal}`}
              i={index}
              rec
            />
          ))}
        </div> */}
        <button
          data-testid="start-recipe-btn"
          className={DIS ? 'hidden' : 'start-btn'}
          onClick={() => handleIniciarReceita(history, id)}
        >
          {IP ? 'Continue recipe' : 'Start recipe'}
        </button>
      </div>
      <Footer />
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
