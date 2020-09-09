import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import AppContext from '../contexts/AppContext';

const pageName = (history, setName) => {
  switch (history.location.pathname) {
    case '/comidas':
      return setName('Comidas');
    case '/bebidas':
      return setName('Bebidas');
    case '/explorar':
      return setName('Explorar');
    case '/explorar/comidas':
      return setName('Explorar Comidas');
    case '/explorar/bebidas':
      return setName('Explorar Bebidas');
    case '/explorar/comidas/ingredientes':
      return setName('Explorar Ingredientes');
    case '/explorar/bebidas/ingredientes':
      return setName('Explorar Ingredientes');
    case '/explorar/comidas/area':
      return setName('Explorar Origem');
    case '/receitas-feitas':
      return setName('Receitas Feitas');
    case '/receitas-favoritas':
      return setName('Receitas Favoritas');
    case '/profile':
      return setName('Perfil');
    default:
      return false;
  }
}

function HEADER() {
  const history = useHistory();
  const { searchBarOn, setSearchBarOn } = useContext(AppContext);

  const [headerName, setHeaderName] = useState();
 
  useState(() => {
    pageName(history, setHeaderName);
  }, []);

  return (
    <div>
      <button data-testid="profile-top-btn" onClick={() => history.push('/profile')}>
        <img alt="profile" src={profile} />
      </button>
      <h1 data-testid="page-title">{headerName}</h1>
      <button data-testid="search-top-btn">
        <img alt="search" src={search} onClick={() => setSearchBarOn(!searchBarOn)} />
      </button>
    </div>
  );
}

export default HEADER;