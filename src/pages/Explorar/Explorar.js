import React from 'react';
import { useHistory } from 'react-router-dom';
import './explorar.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import background from '../../images/background/bg-light-left.png';

export default function Explorar() {
  const history = useHistory();
  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      <Header />
      <div className="explorar-container">
        <button
          data-testid="explore-food"
          className="btn"
          onClick={() => history.push('/explorar/comidas')}
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          className="btn"
          onClick={() => history.push('/explorar/bebidas')}
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}
