import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import ExplorarIngredientes from '../pages/Explorar/ExplorarIngredientes';
import Loading from '../components/Loading';

describe('Tem um componente para ser renderizado enquanto a API processa', () => {
  it('Deve ter o texto Carregando', () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <Loading />
      </Provider>,
      { route: '/comidas' },
    );

    expect(getByText(/Carregando.../i)).toBeInTheDocument();
  })
})