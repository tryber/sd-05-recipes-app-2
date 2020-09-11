import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Header from '../components/Header';

describe('Header ', () => {
  it('Deve conter um icone de perfil que leva pra rota /perfil', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/comidas'}
    );
    const profileIcon = getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    fireEvent(profileIcon);
    expect(useHistory().location.pathname).toBe('/perfil');
  })
})