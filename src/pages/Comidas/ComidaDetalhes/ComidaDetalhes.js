import React, { useContext, useEffect } from 'react';
import * as api from '../../../services/api';
import AppContext from '../../../contexts/AppContext';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function ingredientsList(details) {
  const quantities = [];
  const ingredients = [];

  Object.entries(details).forEach((element) => {
    if (element[0].includes('strMeasure')) {
      quantities.push(element[1]);
    }
    if (element[0].includes('strIngredient')) {
      ingredients.push(element[1]);
    }
  });

  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {quantities.map((element, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`}>
            {ingredients[index]} - {element}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComidaDetalhes() {
  const { selectedId, loading, setLoading, details, setDetails } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    api.byMealId(selectedId).then((data) => {
      setDetails(data.meals[0]);
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="details-header">
        <img
          alt={details.strMeal}
          data-testid="recipe-photo"
          src={details.strMealThumb}
        />
        <h2 data-testid="recipe-title">{details.strMeal}</h2>
        <h4 data-testid="recipe-category">{details.strCategory}</h4>
        <img alt="share button" data-testid="share-btn" src={shareIcon} />
        <img alt="favorite button" data-testid="favorite-btn" src={whiteHeartIcon} />
      </div>
      <div className="details-body">
        <h3>Ingredients</h3>
        {ingredientsList(details)}
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
        <h3>Vídeo</h3>
        <video width="320" height="240" controls>
          <source data-testid="video" src={details.strYoutube} type="video/mp4" />
        </video>
        <h3>Recomendadas</h3>
        <p>Carossel de recomendações</p>
        <button data-testid="start-recipe-btn"> Iniciar receita</button>
      </div>
    </div>
  );
}

export default ComidaDetalhes;
