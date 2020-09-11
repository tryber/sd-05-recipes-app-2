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
  const [cards, setCards] = useState([]);
  const [mealBool, setMealBool] = useState(false);
  const [loading, setLoading] = useState(true);
  const [catChecker, setCatChecker] = useState('');

  useEffect(() => {
    if (history.location.pathname === '/comidas') {
      setMealBool(true);
      api.defaultMeals().then((data) => {
        setCards(data.meals);
        setLoading(false);
      });
    } else {
      setMealBool(false);
      api.defaultDrinks().then((data) => {
        setCards(data.drinks);
        setLoading(false);
      });
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (history.location.pathname === '/comidas') {
      setMealBool(true);
      if (
        selecCategory &&
        selecCategory !== catChecker &&
        selecCategory !== 'All'
      ) {
        api.byMealCategory(selecCategory).then((data) => {
          console.log(data);
          setCards(data.meals);
          setCatChecker(selecCategory);
        });
      } else {
        api.defaultMeals().then((data) => {
          setCards(data.meals);
          setLoading(false);
          setCatChecker('');
        });
      }
    } else if (history.location.pathname === '/bebidas') {
      setMealBool(false);
      if (
        selecCategory &&
        selecCategory !== catChecker &&
        selecCategory !== 'All'
      ) {
        api.byDrinkCategory(selecCategory).then((data) => {
          console.log(data);
          setCards(data.drinks);
          setCatChecker(selecCategory);
        });
      } else {
        api.defaultDrinks().then((data) => {
          setCards(data.drinks);
          setLoading(false);
          setCatChecker('');
        });
      }
    }
  }, [selecCategory]);

  if (loading) return <h1>Loading</h1>;
  return (
    <div>
      <Header />
      <SearchBar />
      <div className="d-flex flex-row flex-wrap justify-content-around">
        {cards
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
              id={
                mealBool ? `comidas ${card.idMeal}` : `bebidas ${card.idDrink}`
              }
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
