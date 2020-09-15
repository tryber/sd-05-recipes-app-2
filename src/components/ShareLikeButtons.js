import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as storage from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../contexts/AppContext';

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

function favoriting(setLiked, liked, details, Meal) {
  setLiked(!liked);
  storage.setNewFavLS(Meal, details);
}

function ShLiButton({ id, copied, setCopied }) {
  const { liked, setLiked, details, Meal } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => share(Meal, details, setCopied)}>
        <img data-testid="share-btn" alt="share button" src={shareIcon} />{' '}
        {copied && <span>Link copiado!</span>}
      </button>
      <button onClick={() => favoriting(setLiked, liked, details, Meal)}>
        <img
          alt="favorite button"
          data-testid="favorite-btn"
          src={liked ? blackHeartIcon : whiteHeartIcon}
        />
      </button>
    </div>
  );
}

export default ShLiButton;

ShLiButton.propTypes = {
  Meal: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  details: PropTypes.objectOf(PropTypes.object).isRequired,
  copied: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  setCopied: PropTypes.func.isRequired,
  setLiked: PropTypes.func.isRequired,
};
