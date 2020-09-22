import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as storage from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.png';
import AppContext from '../contexts/AppContext';
import { ShLikBtn } from '../StyledComps';

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
  if (!liked) {
    setLiked(true);
    storage.setNewFavLS(Meal, details);
  } else {
    setLiked(false);
    storage.removeFavLS(Meal, details);
  }
}

function ShLiButton() {
  const { liked, setLiked, details, Meal, copied, setCopied } = useContext(AppContext);
  return (
    <div className="icon-side">
      <ShLikBtn className="det-btn" onClick={() => favoriting(setLiked, liked, details, Meal)}>
        <img
          alt="favorite button"
          data-testid="favorite-btn"
          src={liked ? blackHeartIcon : whiteHeartIcon}
        />
      </ShLikBtn>
      <ShLikBtn className="det-btn" onClick={() => share(Meal, details, setCopied)}>
        <img data-testid="share-btn" alt="share button" src={shareIcon} />
        {copied && <span>Link copiado!</span>}
      </ShLikBtn>
    </div>
  );
}

export default ShLiButton;

ShLiButton.propTypes = {
  copied: PropTypes.bool.isRequired,
  setCopied: PropTypes.func.isRequired,
};
