import React from 'react';
import * as storage from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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

function favoriting(setLiked, id, liked, details, Meal) {
  setLiked(!liked);
  storage.setNewFavLS(Meal, details);
}

function ShLiButton({ Meal, id, details, copied, setCopied, liked, setLiked }) {
  return (
    <div>
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
  );
}

export default ShLiButton;
