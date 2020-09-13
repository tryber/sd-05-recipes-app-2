import React from 'react';
import Header from '../../components/Header';
import { useHistory } from 'react-router-dom';

export default function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div>
        <button onClick={() => history.push('/explorar/comidas')}>
          Explorar Comidas
        </button>
        <button onClick={() => history.push('/explorar/bebidas')}>
          Explorar Comidas
        </button>
      </div>
    </div>
  );
}
