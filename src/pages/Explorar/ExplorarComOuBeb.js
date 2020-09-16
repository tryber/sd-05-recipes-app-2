import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const typeOfExplore = [
  {datatId: 'explore-by-ingredient', name: 'ingredientes', text: 'Por Ingredientes'},
  {datatId: 'explore-by-area', name: 'area', text: 'Por Local de Origem'},
  {datatId: 'explore-surprise', name: 'surprise', text: 'Me Surpreenda!'},
]

export default function ExplorarComOuBeb() {
  const history = useHistory();
  const [local, setLocal] = useState();
  const [btns, setBtns] = useState(typeOfExplore);
  useEffect(() => {
    if (history.location.pathname === '/explorar/comidas') {
      setLocal('comidas');
    }
    if (history.location.pathname === '/explorar/bebidas') {
      setLocal('bebidas');
      setBtns(typeOfExplore.filter((topic) => topic.name !== 'area'));
    }
  }, []);

  const handleClick = (name) => {
    if (name === 'ingredientes') {
      history.push(`/explorar/${local}/${name}`);
    } else if (name === 'area') {
      console.log('yes to no else', name);
      history.push(`/explorar/comidas/${name}`);
    }
  }

  return (
    <div>
      <Header />
      <div>
        {btns.map((topic) => (
          <button
            key={topic.name}
            data-testid={topic.datatId}
            className="btn"
            onClick={() => handleClick(topic.name)}
          >
            {topic.text}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
