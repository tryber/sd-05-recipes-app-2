import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/Header';
import HCard from '../../../components/HorizontalCard';
import AppContext from '../../../contexts/AppContext';
import Footer from '../../../components/Footer';
import '../donefav.css';

function ReceitasFavoritas() {
  const { fav } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) {
      setFavorites(favRecipes);
      setFilters(favRecipes);
    }
  }, [fav]);
  console.log(favorites);
  return (
    <div className="profile-cont">
      <Header />
      <div className="profile-cat-section">
        <button
          className="btn btn-sm cat-btn"
          data-testid="filter-by-food-btn"
          onClick={() => setFilters(favorites.filter((recipe) => recipe.type === 'comida'))}
        >
          Comidas
        </button>
        <button
          className="btn btn-sm cat-btn"
          data-testid="filter-by-drink-btn"
          onClick={() => setFilters(favorites.filter((recipe) => recipe.type === 'bebida'))}
        >
          Bebidas
        </button>
        <button
          className="btn btn-sm cat-btn"
          data-testid="filter-by-all-btn"
          onClick={() => setFilters(favorites)}>
          Todas
        </button>
      </div>
      {fav && <span>Favoritos atualizados</span>}
      <div className="favdone-card-container">
        {filters.map((card, index) => (
          <HCard card={card} index={index} favOrDone="fav" />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ReceitasFavoritas;
