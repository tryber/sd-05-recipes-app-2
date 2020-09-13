import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AppContext from '../../contexts/AppContext';

export default function Perfil() {
  const history = useHistory();
  const { email } = useContext(AppContext)

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header />
      <div>
        {email}
      </div>
      <div>
        <button className="btn" onClick={() => history.push('/receitas-feitas')}>
          Receitas Feitas
        </button>
        <button className="btn" onClick={() => history.push('/receitas-favoritas')}>
          Receitas Favoritas
        </button>
        <button className="btn" onClick={() => handleClick()}>
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}
