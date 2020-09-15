import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './perfil.css';
import door from '../../images/door.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AppContext from '../../contexts/AppContext';

export default function Perfil() {
  const history = useHistory();
  const { email } = useContext(AppContext);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <div className="profile-body">
        <h4 className="email" data-testid="profile-email">
          {email}
        </h4>
        <div className="btn-container">
          <button
            data-testid="profile-done-btn"
            className="btn btn-opt"
            onClick={() => history.push('/receitas-feitas')}
          >
            Receitas Feitas
          </button>
          <button
            data-testid="profile-favorite-btn"
            className="btn btn-opt"
            onClick={() => history.push('/receitas-favoritas')}
          >
            Receitas Favoritas
          </button>
        </div>
        <button
          data-testid="profile-logout-btn"
          className="btn btn-exit"
          onClick={() => handleClick()}
        >
          <span className="exit-text">Sair</span>
          <img className="door-icon" src={door} alt="sair" />
        </button>
      </div>
      <Footer />
    </div>
  );
}
