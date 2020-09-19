import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import * as mockAPI from './mockAPI';
import Explorar from '../pages/Explorar/Explorar';
import ExplorarArea from '../pages/Explorar/ExplorarArea';

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de explorar por local de origem', () => {
  it('A tela tem os data-testids de todos os 12 cards e de todos os locais de origem', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarArea />
      </Provider>,
      { route: '/explorar/comidas/area' }
    );
    expect(getByTestId('explore-by-area-dropdown')).toBeInTheDocument();
  });
});