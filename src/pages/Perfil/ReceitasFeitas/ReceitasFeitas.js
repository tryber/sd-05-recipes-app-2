import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import HCard from '../../../components/HorizontalCard';
import Footer from '../../../components/Footer';
import '../donefav.css';

function ReceitasFeitas() {
  const [filters, setFilters] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      setDone(doneRecipes);
      setFilters(doneRecipes);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-cont">
        <div className="profile-cat-section">
          <button
            className="btn btn-sm cat-btn"
            data-testid="filter-by-food-btn"
            onClick={() => setFilters(done.filter((recipe) => recipe.type === 'comida'))}
          >
            Comidas
        </button>
          <button
            className="btn btn-sm cat-btn"
            data-testid="filter-by-drink-btn"
            onClick={() => setFilters(done.filter((recipe) => recipe.type === 'bebida'))}
          >
            Bebidas
        </button>
          <button
            className="btn btn-sm cat-btn"
            data-testid="filter-by-all-btn"
            onClick={() => setFilters(done)}
          >
            Todas
        </button>
        </div>
        <div className="favdone-card-container">
          {filters.map((card, index) => (<HCard card={card} index={index} favOrDone="done" />))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReceitasFeitas;

