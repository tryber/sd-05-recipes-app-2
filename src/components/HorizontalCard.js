import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareI from '../images/shareIcon.svg';
import blackHI from '../images/blackHeartIcon.png';
import AppContext from '../contexts/AppContext';
import './horizontalCard.css';
import { CardButton, CardBody } from '../StyledComps';

function handleClick(history, type, id) {
  if (type === 'comida') {
    history.push(`/comidas/${id}`);
  } else {
    history.push(`/bebidas/${id}`);
  }
}

function shareBt(id, type, setCopiado) {
  let linkToCopy;
  if (type === 'comida') {
    linkToCopy = `http://localhost:3000/comidas/${id}`;
  } else {
    linkToCopy = `http://localhost:3000/bebidas/${id}`;
  }
  const textCopy = document.createElement('textarea');
  textCopy.innerText = linkToCopy;
  document.body.appendChild(textCopy);
  textCopy.select();
  document.execCommand('copy');
  textCopy.remove();

  setCopiado(true);
  setTimeout(() => {
    setCopiado(false);
  }, 5000);
}

function disFav(id, type, setFav) {
  const histo = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let removing;
  if (type === 'comida') {
    removing = histo.filter((each) => each.id !== id);
  } else {
    removing = histo.filter((each) => each.id !== id);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(removing));
  setFav(true);
  setTimeout(() => {
    setFav(false);
  }, 5000);
}

function HCard({ card, index, favOrDone }) {
  const { setFav } = useContext(AppContext);
  const history = useHistory();
  const [copiado, setCopiado] = useState(false);

  return (
    <CardBody className="card-horizontal">
      <div className="d-flex align-items-center">
        <CardBody onClick={() => handleClick(history, card.type, card.id)}>
          <img className="hcard-img" src={card.image} alt={card.name} data-testid={`${index}-horizontal-image`} />
        </CardBody>
      </div>
      <div className="hcard-info">
        <div className="hcard-title">
          <span data-testid={`${index}-horizontal-top-text`}>
            {`${card.type === 'bebida' ? card.alcoholicOrNot : card.area} - ${card.category}`}
          </span>
          <h4 data-testid={`${index}-horizontal-name`}>{card.name}</h4>
        </div>
        <div className="hcard-details">
          {favOrDone === 'done' && (
            <p>
              <b>Feita em:</b>
              <span data-testid={`${index}-horizontal-done-date`}>{card.doneDate}</span>
            </p>
          )}
          {favOrDone === 'done' && (
            <span>
              {card.tags.filter((tag, index) => index <= 1).map((each) => (
                <CardButton className="h-tags" data-testid={`${index}-${each}-horizontal-tag`}>{each}</CardButton>
              ))}
            </span>
          )}
          <div>
            {favOrDone === 'fav' && (
              <div className="hcard-btns">
                <CardBody className="det-btn" onClick={() => disFav(card.id, card.type, setFav)}>
                  <img
                    src={blackHI}
                    alt="favorite button"
                    data-testid={`${index}-horizontal-favorite-btn`}
                  />
                </CardBody>
                <CardBody className="det-btn" onClick={() => shareBt(card.id, card.type, setCopiado)}>
                  <img data-testid={`${index}-horizontal-share-btn`} alt="share button" src={shareI} />
                  {copiado && <span>Link copiado!</span>}
                </CardBody>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardBody>
  );
}

export default HCard;

HCard.propTypes = {
        card: PropTypes.objectOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  favOrDone: PropTypes.string.isRequired,
};
