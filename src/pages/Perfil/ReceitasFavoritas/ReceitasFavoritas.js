import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import HCard from '../../../components/HorizontalCard';

function ReceitasFeitas() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) {
      setFavorites(favRecipes);
    }
  }, []);
  console.log(favorites);
  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn">Todas</button>
        <button data-testid="filter-by-food-btn">Comidas</button>
        <button data-testid="filter-by-drink-btn">Bebidas</button>
      </div>
      {favorites.map((card, index) => (
        <HCard card={card} index={index} />
      ))}
    </div>
  );
}

export default ReceitasFeitas;
