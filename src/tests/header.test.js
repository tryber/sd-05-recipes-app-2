import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Header from '../components/Header';
import App from '../App';
import Home from '../pages/Home/Home';

describe('Header deve ter icone do perfil, titulo e lupa', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
    );
    const profileIcon = getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const searchIcon = getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
  });
  it('Icones do perfil e da lupa devem estar na tela', () => {
    const { getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
    );
    const imgProfle = getByAltText('profile');
    expect(imgProfle.src).toBe('http://localhost/profileIcon.svg');
    const imgSearch = getByAltText('search');
    expect(imgSearch.src).toBe('http://localhost/searchIcon.svg');
  });
  it('A lupa deve renderizar em telas específicas e o título deve ser correto para cada tela', () => {
    const { history, getByTestId, queryByTestId } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/comidas'}
    );
    const checkTitle = (title) => {
      const searchIcon = queryByTestId('search-top-btn');
      const pageTitle = getByTestId('page-title');
      expect(searchIcon).toBeInTheDocument();
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle.innerHTML).toBe(title);
    }
    
    checkTitle('Comidas');

    // history.push('/bebidas');
    // expect(history.location.pathname).toBe('/bebidas');
    // checkTitle('Bebidas');
  })
})

describe('Header, icone Perfil', () => {
  it('Deve conter um icone de perfil que leva pra rota /perfil', () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/comidas'}
    );
    const profileIcon = getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    fireEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/perfil');
  })
})

// describe('Header, icone lupa (search)', () => {
//   it('Deve conter um icone de lupa que abre a barra de busca', async () => {
//     const { getByTestId } = renderWithRouter(
//       <Provider>
//         <Home />
//       </Provider>,
//       { route: '/comidas'}
//     );
//     const searchIcon = getByTestId('search-top-btn');
//     expect(searchIcon).toBeInTheDocument();
//     fireEvent.click(searchIcon);
//     const searchInp = await getByTestId('search-input'); 
//     expect(searchInp).toBeInTheDocument();
//     expect(getByTestId('exec-search-btn')).toBeInTheDocument();
//     expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
//     expect(getByTestId('name-search-radio')).toBeInTheDocument();
//     expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
//   })
// })
