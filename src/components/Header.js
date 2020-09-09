import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import AppContext from '../contexts/AppContext';

function HEADER() {
  const history = useHistory();
  const { searchBarOn, setSearchBarOn } = useContext(AppContext);

  const [headerName, setHeaderName] = useState();

  const pageName = () => {
    switch (history.location) {
      case '/comidas':
        return setHeaderName('Comidas');
      case '/bebidas':
        return setHeaderName('Bebidas');
      case '/explorar':
        return setHeaderName('Explorar');
      case '/explorar/comidas':
        return setHeaderName('Explorar Comidas');
      case '/explorar/bebidas':
        return setHeaderName('Explorar Bebidas')
      default:
        return false;
    }
  }

  useState(() => {
    pageName();
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