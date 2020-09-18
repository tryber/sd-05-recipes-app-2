import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareI from '../images/shareIcon.svg';
import blackHI from '../images/blackHeartIcon.svg';
import AppContext from '../contexts/AppContext';
import './horizontalCard.css';

function handleClick(history, type, id) {
  if (type === 'comida') {
    history.push(`/comidas/${id}`);
  } else {
    history.push(`/bebidas/${id}`);
  }
}

function shareBt(id, type, setCopied) {
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

  setCopied(true);
  setTimeout(() => {
    setCopied(false);
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
  const { copied, setCopied, setFav } = useContext(AppContext);
  const history = useHistory();

  return (
    <div className="card-horizontal">
      <div>
        <button onClick={() => handleClick(history, card.type, card.id)}>
          <img className="hcard-img" src={card.image} alt={card.name} data-testid={`${index}-horizontal-image`} />
        </button>
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
            </p>)}
          {favOrDone === 'done' && (
            <span>
              {card.tags.filter((tag, index) => index <= 1).map((each) => (
                <span className="h-tags" data-testid={`${index}-${each}-horizontal-tag`}>{each}</span>
              ))}
            </span>
          )}
        </div>
        {favOrDone === 'fav' && (
          <div className="hcard-btns">
            <button onClick={() => disFav(card.id, card.type, setFav)}>
              <img src={blackHI} alt="favorite button" data-testid={`${index}-horizontal-favorite-btn`} />
            </button>
            <button onClick={() => shareBt(card.id, card.type, setCopied)}>
              <img data-testid={`${index}-horizontal-share-btn`} alt="share button" src={shareI} />
              {copied && <span>Link copiado!</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HCard;

HCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  favOrDone: PropTypes.string.isRequired,
};
