import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import HEADER from '../../components/Header';

function emailInput(handleEmail) {
  return (
    <label htmlFor="email">
      Email:
      <input
        data-testid="email-input"
        type="email"
        name="email"
        onChange={(e) => handleEmail(e)}
      />
    </label>
  )
};

function passwordInput(handlePassword) {
  return (
    <label htmlFor="password">
      Senha:
      <input
        data-testid="password-input"
        type="password"
        name="senha"
        onChange={(e) => handlePassword(e)}
      />
    </label>
  )
};

function Login() {
  const [emailChecked, setEmailChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { email, setEmail, setPassword } = useContext(AppContext);

  const checkEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) === true) {
      setEmailChecked(true);
      return true;
    } else {
      setEmailChecked(false);
      return false;
    }
  };

  const checkPassword = (password) => {
    if (password.length > 6) {
      setPasswordChecked(true);
      return true;
    } else {
      setPasswordChecked(false);
      return false;
    }
  };

  const handleEmail = (e) => {
    if (checkEmail(e.target.value) === true) setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    if (checkPassword(e.target.value) === true) setPassword(e.target.value);
  };

  const saveToStorage = (email) => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('email', JSON.stringify({ email }))
  };

  /*  const teclaEnter = (tecla, email) => {
      if (tecla.key === 'Enter' && emailChecked && passwordChecked) saveToStorage(email);
    };
   */
  return (
    <div>
      <HEADER />
      <form>
        {emailInput(handleEmail)}
        {passwordInput(handlePassword)}
      </form>
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={!(emailChecked && passwordChecked)}
          onClick={() => saveToStorage(email)}
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
