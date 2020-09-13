import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
      <div data-testid="profile-email">
        {email}
      </div>
      <div>
        <button
          data-testid="profile-done-btn"
          className="btn"
          onClick={() => history.push('/receitas-feitas')}
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          className="btn"
          onClick={() => history.push('/receitas-favoritas')}
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          className="btn"
          onClick={() => handleClick()}
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}
