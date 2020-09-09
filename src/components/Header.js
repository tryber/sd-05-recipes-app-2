import React from 'react';
//  { useContext } from 'react';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import { useHistory } from 'react-router-dom';

function HEADER() {
  const history = useHistory();
  const { searchBarOn, setSearchBarOn } = useContext(AppContext);
  return (
    <div>
      <button data-testid="profile-top-btn" onClick={() => history('/profile')}>
        <img alt="profile" src={profile} />
      </button>
      <h1 data-testid="page-title">CABEÇALHO</h1>
      <button data-testid="search-top-btn">
        <img alt="search" src={search} onClick={() => setSearchBarOn(!searchBarOn)} />
      </button>
    </div>
  );
}

export default HEADER;