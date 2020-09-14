import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Card from './Card';

// como não sobrescrever os favoritos?
// como fazer done+id ou favorites+id?
// por que quebrou o teste no link copiado?

/*function saveLiked(Meal, details, setLiked, liked) {
  setLiked(!liked);
   const favRec = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFav = {
    id: Meal ? details.idMeal : details.idDrink,
    type: Meal ? 'comida' : 'bebida',
    area: details.srtArea,
    category: details.strCategory,
    alcoholicOrNot: Meal ? '' : 'alcoholic',
    name: Meal ? details.strMeal : details.strDrink,
    image: Meal ? details.strMealThumb : details.strDrinkThumb,
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favRec, newFav])); 
}
*/

// quando clicar de novo no botão precisa remover o item
// localStorage.removeItem('myKey');

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
  const [liked, setLiked] = useState(false);
  const [done, setDone] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  // const doneRec = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log('textinho', doneRec);

  /*   useEffect(() => {
      if (doneRec) {
        doneRec.find((data) => {
          if (data.id === id) return setDone(true)
        })
      }
    }, []); */

  /*   useEffect(() => {
      const favRec = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favRec) {
        favRec.find((fav) => fav.id === id) ? setLiked(true)
          : setLiked(false)
      }
    }, []); */

  return (
    <div>
      <div className="details-header">
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
        <button onClick={() => setLiked(!liked)}>
          <img alt="favorite button" data-testid="favorite-btn" src={!liked ? whiteHeartIcon : blackHeartIcon} />
        </button>
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
        {!done && <button
          style={style}
          data-testid="start-recipe-btn"
          onClick={() => handleIniciarReceita(history)}
        >
          Iniciar receita
        </button>}
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
