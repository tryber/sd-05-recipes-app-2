import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './perfil.css';
import door from '../../images/door.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BackgroundBody } from '../../StyledComps';

export default function Perfil() {
  const history = useHistory();
  const [mail, setMail] = useState('');

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setMail(JSON.parse(localStorage.getItem('user')).email);
  }, []);

  return (
    <BackgroundBody className="profile-page">
      <Header />
      <div className="profile-container">
        <p className="email" data-testid="profile-email">
          {mail}
        </p>
        <div className="btn-container">
          <button
            data-testid="profile-done-btn"
            className="btn-laranja profile-btn"
            onClick={() => history.push('/receitas-feitas')}
          >
            Receitas Feitas
          </button>
          <button
            data-testid="profile-favorite-btn"
            className="btn-laranja profile-btn"
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
    </BackgroundBody>
  );
}
