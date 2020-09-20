import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './perfil.css';
import door from '../../images/door.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import background from '../../images/background/bg-light-right.png';

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
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <Header />
      <div className="profile-body">
        <p className="email" data-testid="profile-email">
          {mail}
        </p>
        <div className="btn-container">
          <button
            data-testid="profile-done-btn"
            className="profile-btn"
            onClick={() => history.push('/receitas-feitas')}
          >
            Receitas Feitas
          </button>
          <button
            data-testid="profile-favorite-btn"
            className="profile-btn"
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
