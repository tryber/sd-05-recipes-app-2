limport React, { useContext } from 'react';
import * as api from '../../services/api';
import AppContext from '../../contexts/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';


function ComidaDetalhes() {
  const { id } = useContext(AppContext);

  return (
    <div>
      <div className="details-header">
        <img
          alt={recipe_name}
          data-testid="recipe-photo"
          src={recipe_thumb}
        />
        <h2 data-testid="recipe-title">Receita-Título</h2>
        <h4 data-testid="recipe-category">Receita-Categoria</h4>
        <img alt="share button" data-testid="share-btn" src={shareIcon} />
        <img alt="favorite button" data-testid="favorite-btn" src={whiteHeartIcon} />
      </div>
      <div className="details-body">
        <h3>Ingredients</h3>
        <li data-testid={`${index}-ingredient-name-and-measure`}>Um certo ingrediente</li>
        <h3>Instructions</h3>
        <p data-testid="instructions">Descrição das instruções aqui</p>
        <h3>Vídeo</h3>
        <video width="320" height="240" controls>
          <source data-testid="video" src={} type="video/mp4" />
        </video>
        <h3>Recomendadas</h3>
        <p>Aqui vai ter um carrossel</p>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </div>
  );
}

export default ComidaDetalhes;

// função da requisição: byMealId(id)
// importar a função de requisição
// usar como parâmetro a id que está no contexto
// byMealId(id).then() -> armazena resultados

// todos os data-testid
// data-testid="recipe-photo" OK
// data-testid="recipe-title" OK
// data-testid="share-btn" OK
// data-testid="favorite-btn" OK
// data-testid="recipe-category" OK
// data-testid=`${index}-ingredient-name-and-measure` OK
// data-testid="instructions" OK
// data-testid="video" OK
// data-testid=`${index}-recomendation-card` - não tem
// data-testid=`${index}-recomendation-title` - não tem
// data-testid="start-recipe-btn" OK