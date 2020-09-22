import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ControlledCarousel({recom, history, Meal}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const hClickCar = (history, each, Meal) => {
    if (Meal) {
      history.push(`/bebidas/${each.idDrink}`);
    } else {
      history.push(`/comidas/${each.idMeal}`);
    }
  }

  return (
    <Carousel className="carousel-div" activeIndex={index} onSelect={handleSelect}>
      {recom.map((each, i) => 
        (i === 0) ? (
          <Carousel.Item>
            <button onClick={() => hClickCar(history, each, Meal)}>
              <img
                className="d-block w-100"
                src={Meal ? each.strDrinkThumb : each.strMealThumb}
                alt="First slide"
              />
            </button>
            <Carousel.Caption className="carousel-text">
              <p data-testid={`${i}-recomendation-title`}>{Meal ? each.strDrink : each.strMeal}</p>
            </Carousel.Caption>
          </Carousel.Item>) : (
            <Carousel.Item>
              <button onClick={() => hClickCar(history, each, Meal)}>
                <img
                  className="d-block w-100"
                  src={Meal ? each.strDrinkThumb : each.strMealThumb}
                  alt={Meal ? each.strDrink : each.strMeal}
                />
              </button>
              <Carousel.Caption className="carousel-text">
                <p data-testid={`${i}-recomendation-title`}>{Meal ? each.strDrink : each.strMeal}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
      )}
    </Carousel>
  );
}
