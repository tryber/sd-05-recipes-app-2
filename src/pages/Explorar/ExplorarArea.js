import React, { useEffect, useState } from 'react';
import * as api from '../../services/api';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import AllCards from '../../components/AllCards';

export default function ExplorarArea() {
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const Meal = true;

  
  useEffect(() => {
    api.defaultMeals().then((data) => setCards(data.meals))
    api.mealListArea().then((data) => setAreaList(data.meals));
    setLoading(false);
  }, []);

  const hCh = (area) => {
    setLoading(true);
    api.byMealArea(area).then((data) => setCards(data.meals));
    setLoading(false);
  }

  if (loading) return <Loading />;
  return (
    <div>
      <Header />
      <div>
        <select data-testid="explore-by-area-dropdown" onChange={(e) => hCh(e.target.value)}>
          <option data-testid="All-option" value="All">All</option>
          {areaList.map((area) =>
            <option data-testid={`${area.strArea}-option`} key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          )}
        </select>
      </div>
      <div className="home-body">
        <AllCards cards={cards} Meal={Meal} />
      </div>
      <Footer />
    </div>
  );
}
