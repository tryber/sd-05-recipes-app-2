import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Card(props) {
  const { description, thumb, i } = props;
  return (
    <div className="card" data-testid={`${i}-recipe-card`}>
      <img
        src={thumb}
        alt={description}
        className="card-image-top"
        data-testid={`${i}-card-img`}
      />
      <div className="card-body">
        <h4
          className="card-title d-flex flex-column justify-content-end align-items-center"
          data-testid={`${i}-card-name`}
        >
          {description}
        </h4>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
};
