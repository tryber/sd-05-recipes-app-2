import React from 'react';
import { useHistory } from 'react-router-dom';
import './explorar.css';
import Header from '../../components/Header';

export default function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div className="explorar-container">
        <button className="btn" onClick={() => history.push('/explorar/comidas')}>
          Explorar Comidas
        </button>
        <button className="btn" onClick={() => history.push('/explorar/bebidas')}>
          Explorar Bebidas
        </button>
      </div>
    </div>
  );
}
