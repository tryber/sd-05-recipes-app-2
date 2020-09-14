import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../services/api';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import AppContext from '../../contexts/AppContext';
import AllCards from '../../components/AllCards';

function mealStarter(setCards, setLoading) {
  api.defaultMeals().then((data) => {
    setCards(data.meals);
    setLoading(false);
  });
}

function drinkStarter(setCards, setLoading) {
  api.defaultDrinks().then((data) => {
    setCards(data.drinks);
    setLoading(false);
  });
}

function meal({
  selecCategory,
  caCh,
  setCards,
  setcaCh,
  setLoading,
  filteredData,
  filCh,
  setfilCh,
}) {
  if (selecCategory && selecCategory !== caCh && selecCategory !== 'All') {
    api.byMealCategory(selecCategory).then((data) => {
      setCards(data.meals);
      setcaCh(selecCategory);
    });
  } else if (filteredData && filteredData !== filCh) {
    setCards(filteredData);
    setfilCh(filteredData);
  } else {
    api.defaultMeals().then((data) => {
      setCards(data.meals);
      setLoading(false);
      setcaCh('');
    });
  }
}

function drink({
  selecCategory,
  caCh,
  setCards,
  setcaCh,
  setLoading,
  filteredData,
  filCh,
  setfilCh,
}) {
  if (selecCategory && selecCategory !== caCh && selecCategory !== 'All') {
    api.byDrinkCategory(selecCategory).then((data) => {
      setCards(data.drinks);
      setcaCh(selecCategory);
    });
  } else if (filteredData && filteredData !== filCh) {
    setCards(filteredData);
    setfilCh(filteredData);
  } else {
    api.defaultDrinks().then((data) => {
      setCards(data.drinks);
      setLoading(false);
      setcaCh('');
    });
  }
}

function Home() {
  const {
    location: { pathname },
  } = useHistory();
  const { selecCategory, filteredData } = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [Meal, setMeal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [caCh, setcaCh] = useState('');
  const [filCh, setfilCh] = useState('');

  useEffect(() => {
    if (pathname === '/comidas') {
      setMeal(true);
      mealStarter(setCards, setLoading);
    } else {
      setMeal(false);
      drinkStarter(setCards, setLoading);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/comidas') {
      setMeal(true);
      meal({ selecCategory, caCh, setCards, setcaCh, setLoading, filteredData, filCh, setfilCh });
    } else if (pathname === '/bebidas') {
      setMeal(false);
      drink({ selecCategory, caCh, setCards, setcaCh, setLoading, filteredData, filCh, setfilCh });
    }
  }, [selecCategory, filteredData]);
  if (loading) return <h1>Loading</h1>;
  return (
    <div>
      <Header />
      <SearchBar />
      <div className="home-body">
        <AllCards cards={cards} Meal={Meal} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
