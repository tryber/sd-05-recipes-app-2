import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'pure-react-carousel/dist/react-carousel.es.css';
import * as api from '../../../services/api';
import AppContext from '../../../contexts/AppContext';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import './style.css';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
/* import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; */

localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {} }));


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

function handleFinalizarReceita(history) {
  history.push(`/`);
}

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};

function handleDashed(e, setUtilizados, utilizados, id) {
  const line = document.getElementsByClassName(`${e.target.id}`)[0];
  if (e.target.checked) {
    line.style.textDecoration = 'line-through';
    setUtilizados([...utilizados, e.target.id]);
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    LS.meals[id] = [...utilizados, e.target.id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
  } else {
    line.style.textDecoration = 'none';
    const newArr = utilizados.filter((data) => data !== e.target.id);
    setUtilizados(newArr);
  }
}

function ingredientsList(details, setUtilizados, utilizados, id) {
  const quantities = [];
  const ingredients = [];

  Object.entries(details).forEach((element) => {
    if (element[0].includes('strMeasure') && element[1] && element[1] !== ' ') {
      quantities.push(element[1]);
    }
    if (element[0].includes('strIngredient') && element[1] && element[1] !== ' ') {
      ingredients.push(element[1]);
    }
  });
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {quantities.map((element, index) => (
          <li data-testid={`${index}-ingredient-step`}>
            <input
              type="checkbox"
              id={`${ingredients[index]} - ${element}`}
              onChange={(e) => handleDashed(e, setUtilizados, utilizados, id)}
            />
            <label htmlFor={`${ingredients[index]} - ${element}`}>
              <span className={`${ingredients[index]} - ${element} ing`}>
                {ingredients[index]} - {element}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComidaInProgress() {
  const { loading, setLoading, details, setDetails } = useContext(AppContext);
  const [copied, setCopied] = useState(false);
  const [Meal, setMeal] = useState(true);
  const [utilizados, setUtilizados] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (history.location.pathname.includes('comidas')) {
      setLoading(true);
      api.byMealId(id).then((data) => {
        setDetails(data.meals[0]);
        setLoading(false);
      });
      setMeal(true);
    }
    if (history.location.pathname.includes('bebidas')) {
      api.byDrinkId(id).then((data) => {
        setDetails(data.drinks[0]);
        setMeal(false);
      });
    }
  }, [id]);

  useEffect(() => {
  }, [utilizados]);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
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
        <button data-testid="share-btn" onClick={() => share(Meal, details, setCopied)}>
          <img alt="share button" src={shareIcon} /> {copied && <span>Link copiado!</span>}
        </button>
        <img alt="favorite button" data-testid="favorite-btn" src={whiteHeartIcon} />
      </div>
      <div className="details-body">
        {ingredientsList(details, setUtilizados, utilizados, id)}
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
        <button
          style={style}
          data-testid="finish-recipe-btn"
          onClick={() => handleFinalizarReceita(history)}
        >
          {' '}
          Finalizar receita
        </button>
      </div>
    </div>
  );
}

export default ComidaInProgress;
