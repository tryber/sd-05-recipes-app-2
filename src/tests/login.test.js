import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Login from '../pages/Login/Login';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
    expect(getByTestId("login-submit-btn")).toBeInTheDocument();
  });
});

describe('A pessoa deve conseguir escrever seu email no input de email', () => {
  it('É possível escrever o email', () => {
    const { getByLabelText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    const emailInput = getByLabelText(/E-mail:/i);
    fireEvent.change(emailInput, { target: { value: 'myemail@emailprovider.com' } });
    expect(emailInput.value).toBe('myemail@emailprovider.com');
  });
});

describe('A pessoa deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    const { getByLabelText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    const passwordInput = getByLabelText(/Senha:/i);
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    expect(passwordInput.value).toBe('12345678');
  });
});

describe('O formulário só fica válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    const { getByRole, getByLabelText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    const submitBtn = getByRole('button', { name: /Entrar/i });
    const emailInput = getByLabelText(/E-mail:/i);
    const passwordInput = getByLabelText(/Senha:/i);

    expect(submitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'email@email' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(submitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'email.com' } });
    expect(submitBtn).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    const { getByRole, getByLabelText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    const submitBtn = getByRole('button', { name: /Entrar/i });
    const emailInput = getByLabelText(/E-mail:/i);
    const passwordInput = getByLabelText(/Senha:/i);

    expect(submitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'myemail@emailprovider.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(submitBtn).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByRole, getByLabelText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    const submitBtn = getByRole('button', { name: /Entrar/i });
    const emailInput = getByLabelText(/E-mail:/i);
    const passwordInput = getByLabelText(/Senha:/i);

    expect(submitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'myemail@emailprovider.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    expect(submitBtn).toBeEnabled();
  });
});

describe('Após a submissão, 2 tokens devem ser salvos em localStorage identificados pelas chaves mealsToken e cocktailsToken', () => {
  it('Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    const { getByRole, getByLabelText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>);
    const submitBtn = getByRole('button', { name: /Entrar/i });
    const emailInput = getByLabelText(/E-mail:/i);
    const passwordInput = getByLabelText(/Senha:/i);
    
    expect(submitBtn).toBeDisabled();
    localStorage.clear();
  
    fireEvent.change(emailInput, { target: { value: 'myemail@emailprovider.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(submitBtn);

    expect(localStorage.__STORE__['mealsToken']).toBe('1');
    expect(localStorage.__STORE__['cocktailsToken']).toBe('1');
  });
});

/* describe('Após a submissão, o e-mail de pessoa usuária deve ser salvo em localStorage na chave user', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
    });


    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="password-input"]').type('1234567');
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem('user'))).to.deep.eq({ email: 'email@mail.com' });
      win.localStorage.clear();
    });
  });
}); */

/* describe('Após a submissão e validação com sucesso do login, o usuário deve ser redirecionado para a tela principal de receitas de comidas', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });

    cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
    });


    cy.get('[data-testid="email-input"]').type('email@mail.com');
    cy.get('[data-testid="password-input"]').type('1234567');
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/comidas'));

    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });
}); */

// referências
// https://testing-library.com/docs/example-input-event
