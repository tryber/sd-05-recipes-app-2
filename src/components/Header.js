import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import AppContext from '../contexts/AppContext';

const pageName = (history, setName, searchIcon) => {
  switch (history.location.pathname) {
    case '/comidas':
      searchIcon(true);
      return setName('Comidas');
    case '/bebidas':
      searchIcon(true);
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
      searchIcon(true);
      return setName('Explorar Origem');
    case '/receitas-feitas':
      return setName('Receitas Feitas');
    case '/receitas-favoritas':
      return setName('Receitas Favoritas');
    case '/profile':
      return setName('Perfil');
    case '/':
      searchIcon(true);
      return setName('HEADER MANEIRO');
    default:
      return false;
  }
};

function Header() {
  const history = useHistory();
  const { searchBarOn, setSearchBarOn } = useContext(AppContext);

  const [headerName, setHeaderName] = useState();
  const [hasSearch, setHasSearch] = useState(false);

  useState(() => {
    pageName(history, setHeaderName, setHasSearch);
  }, []);

  return (
    <div>
      <button data-testid="profile-top-btn" onClick={() => history.push('/profile')}>
        <img alt="profile" src={profile} />
      </button>
      <h1 data-testid="page-title">{headerName}</h1>
      {hasSearch &&
        <button data-testid="search-top-btn" onClick={() => {setSearchBarOn(!searchBarOn)}} >
          <img alt="search" src={search} />
        </button>
      }
    </div>
  );
}

export default Header;
