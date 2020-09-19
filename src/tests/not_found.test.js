import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import ExplorarIngredientes from '../pages/Explorar/ExplorarIngredientes';
import NotFound from '../components/NotFound';

describe('Deve ter uma página de Not Found caso o usuário tente um link não existente', () => {
  it('Tem um texto informando não ter sido encontrado e uma img', () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <NotFound />
      </Provider>,
      { route: '/explorar/bebidas/area' }
    );

    expect(getByText(/Sorry, Not Found/i)).toBeInTheDocument();
  })
})