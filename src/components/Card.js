import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import AppContext from '../contexts/AppContext';

function HandleClick(id, history, setSelectedId) {
  localStorage.setItem('doneRecipes', 'abobrinha');
  localStorage.setItem('favoriteRecipes', 'batatinha');
  const info = id.split(' ');
  setSelectedId(info[1]);
  history.push(`/${info[0]}/${info[1]}`);
}
function Card(props) {
  const { setSelectedId } = useContext(AppContext);
  const history = useHistory();
  const { description, thumb, i, id, rec } = props;
  return (
    <button
      className={rec && i > 1 ? 'hidden card-btn' : 'card-btn'}
      data-testid={rec ? `${i}-recomendation-card` : `${i}-recipe-card`}
      onClick={() => HandleClick(id, history, setSelectedId)}
    >
      <div className="card">
        <img
          src={thumb}
          alt={description}
          className="card-image-top"
          data-testid={rec ? `${i}-recomendation-img` : `${i}-card-img`}
        />
        <div className="card-body card-description">
          <p
            className="card-title d-flex flex-column justify-content-end align-items-center"
            data-testid={rec ? `${i}-recomendation-title` : `${i}-card-name`}
          >
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export default Card;

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  rec: PropTypes.bool.isRequired,
};
