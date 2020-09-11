import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card';
import * as api from '../../services/api';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import AppContext from '../../contexts/AppContext';

function Home() {
  const history = useHistory();
  const { selecCategory, filteredData } = useContext(AppContext);
  const [defaultCards, setDefaultCards] = useState([]);
  const [mealBool, setMealBool] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (history.location.pathname === '/comidas') {
      setMealBool(true);
      console.log(selecCategory);
      api.defaultMeals().then((data) => {
        setDefaultCards(data.meals);
        setLoading(false);
      });
    } else {
      setMealBool(false);
      api.defaultDrinks().then((data) => {
        setDefaultCards(data.drinks);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <h1>Loading</h1>;
  return (
    <div>
      <Header />
      <SearchBar />
      <div className="d-flex flex-row flex-wrap justify-content-around">
        {defaultCards
          .filter((data, index) => {
            if (index < 12) return data;
            return false;
          })
          .map((card, index) => (
            <Card
              thumb={mealBool ? card.strMealThumb : card.strDrinkThumb}
              description={mealBool ? card.strMeal : card.strDrink}
              i={index}
              key={mealBool ? card.idMeal : card.idDrink}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
