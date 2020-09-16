import React from 'react';
import shareI from '../images/shareIcon.svg';
import blackHI from '../images/blackHeartIcon.svg';

function HCard({ card, index }) {
  return (
    <button className="card-rec">
      <div className="card">
        <img
          src={card.image}
          alt={card.name}
          className="card-image-top"
          data-testid={`${index}-horizontal-image`}
        />
        <div className="card-body card-description">
          <p
            className="card-title d-flex flex-column justify-content-end align-items-center"
            data-testid={`${index}-horizontal-top-text`}
          >
            {`${card.type === 'bebida' ? card.alcoholicOrNot : card.area} - ${card.category}`}
          </p>
          <p data-testid={`${index}-horizontal-name`}>{card.name}</p>
          <div>
            <button className="det-btn">
              <img
                src={blackHI}
                alt="favorite button"
                data-testid={`${index}-horizontal-favorite-btn`}
              />
            </button>
            <button className="det-btn">
              <img data-testid={`${index}-horizontal-share-btn`} alt="share button" src={shareI} />
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}

export default HCard;
