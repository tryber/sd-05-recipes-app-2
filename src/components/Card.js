import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import AppContext from '../contexts/AppContext';

function HandleClick(id, history, setSelectedId) {
  const info = id.split(' ');
  setSelectedId(info[1]);
  history.push(`/${info[0]}/${info[1]}`);
}
function Card(props) {
  const { setSelectedId } = useContext(AppContext);
  const history = useHistory();
  const { description, thumb, i, id } = props;
  return (
    <button className="card-btn" data-testid={`${i}-recipe-card`} onClick={() => HandleClick(id, history, setSelectedId)}>
      <div className="card">
        <img
          src={thumb}
          alt={description}
          className="card-image-top"
          data-testid={`${i}-card-img`}
        />
        <div className="card-body">
          <p
            className="card-title d-flex flex-column justify-content-end align-items-center"
            data-testid={`${i}-card-name`}
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
};
