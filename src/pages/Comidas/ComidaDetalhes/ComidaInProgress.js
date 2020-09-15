import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'pure-react-carousel/dist/react-carousel.es.css';
import * as api from '../../../services/api';
import * as storage from '../../../services/localStorage';
import AppContext from '../../../contexts/AppContext';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import './style.css';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import DetailHeader from '../../../components/DetailHeader';
/* import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'; */

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

function disabling() {
  let disabled = true;
  let checked = 0;
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.checked ? (checked += 1) : 0));
  if (checked > 0 && checked === inputs.length) {
    disabled = false;
  }
  return disabled;
}

function handleFinalizarReceita(history) {
  history.push('/receitas-feitas');
}

const style = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};

const styleDash = {
  textDecoration: 'line-through',
};
const styleNone = {
  textDecoration: 'none',
};

function checkLS(str, id, history) {
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (LS && history.location.pathname.includes('comidas')) {
    if (LS.meals[id]) {
      const newCheck = LS.meals[id].some((each) => each === str);
      return newCheck;
    }
  }
  if (LS && history.location.pathname.includes('bebidas')) {
    const newCheck = LS.cocktails[id].some((each) => each === str);
    return newCheck;
  }
  return false;
}

function handleDashed(e, setUtilizados, utilizados, id, history) {
  const line = document.getElementsByClassName(`${e.target.id}`)[0];
  if (e.target.checked) {
    line.style.textDecoration = 'line-through';
    setUtilizados([...utilizados, e.target.id]);
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (history.location.pathname.includes('comidas')) {
      LS.meals[id] = [...utilizados, e.target.id];
    }
    if (history.location.pathname.includes('bebidas')) {
      LS.cocktails[id] = [...utilizados, e.target.id];
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
  } else {
    line.style.textDecoration = 'none';
    const newArr = utilizados.filter((data) => data !== e.target.id);
    setUtilizados(newArr);
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (history.location.pathname.includes('comidas')) {
      LS.meals[id] = newArr;
    }
    if (history.location.pathname.includes('bebidas')) {
      LS.cocktails[id] = newArr;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
  }
}

function ingredientsList(details, setUtilizados, utilizados, id, history) {
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
              checked={checkLS(`${ingredients[index]} - ${element}`, id, history)}
              id={`${ingredients[index]} - ${element}`}
              onChange={(e) => handleDashed(e, setUtilizados, utilizados, id, history)}
            />
            <label htmlFor={`${ingredients[index]} - ${element}`}>
              <span
                style={
                  checkLS(`${ingredients[index]} - ${element}`, id, history) ? styleDash : styleNone
                }
                className={`${ingredients[index]} - ${element} ing`}
              >
                {ingredients[index]} - {element}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function favoriting(setLiked, id, liked, details, Meal) {
  setLiked(!liked);
  const newFav = {
    id: Meal ? details.idMeal : details.idDrink,
    type: Meal ? 'comida' : 'bebida',
    area: Meal ? details.strArea : '',
    category: details.strCategory,
    alcoholicOrNot: Meal ? '' : details.strAlcoholic,
    name: Meal ? details.strMeal : details.strDrink,
    image: Meal ? details.strMealThumb : details.strDrinkThumb,
  };
  const historico = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!historico) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFav]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...historico, newFav]));
  }
  console.log(historico);
}

function ComidaInProgress() {
  const { loading, setLoading, details, setDetails } = useContext(AppContext);
  const [copied, setCopied] = useState(false);
  const [Meal, setMeal] = useState(true);
  const [liked, setLiked] = useState(false);
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { id } = useParams();
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let historico = [];
  if (history.location.pathname.includes('comidas')) {
    if (LS) {
      historico = LS.meals[id];
    }
  }
  if (history.location.pathname.includes('bebidas')) {
    if (LS) {
      historico = LS.cocktails[id];
    }
  }

  const [utilizados, setUtilizados] = useState(historico);

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
    storage.inProgressLS(id, LS, historico, pathname);
    storage.favoriteLS(id, setLiked);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <div>
        <DetailHeader Meal={Meal} details={details} />
        <button onClick={() => share(Meal, details, setCopied)}>
          <img data-testid="share-btn" alt="share button" src={shareIcon} />{' '}
          {copied && <span>Link copiado!</span>}
        </button>
        <button onClick={() => favoriting(setLiked, id, liked, details, Meal)}>
          <img
            alt="favorite button"
            data-testid="favorite-btn"
            src={liked ? blackHeartIcon : whiteHeartIcon}
          />
        </button>
      </div>
      <div className="details-body">
        {ingredientsList(details, setUtilizados, utilizados, id, history)}
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
        <button
          style={style}
          data-testid="finish-recipe-btn"
          disabled={disabling()}
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
