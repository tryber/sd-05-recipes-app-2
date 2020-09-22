import React from 'react';
import { useHistory } from 'react-router-dom';
import './explorar.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BackgroundBody } from '../../StyledComps';

export default function Explorar() {
  const history = useHistory();
  return (
    <BackgroundBody className="explorar-page">
      <Header />
      <div className="explorar-container">
        <button
          data-testid="explore-food"
          className="btn-laranja explorar-btn"
          onClick={() => history.push('/explorar/comidas')}
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          className="btn-laranja explorar-btn"
          onClick={() => history.push('/explorar/bebidas')}
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </BackgroundBody>
  );
}
