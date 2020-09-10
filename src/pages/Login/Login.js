import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import HEADER from '../../components/Header';
import SearchBar from '../../components/SearchBar';

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
  );
}

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
  );
}

function checkEmail(email, setEmailChecked) {
  const regex = /\S+@\S+\.\S+/;
  if (regex.test(email) === true) {
    setEmailChecked(true);
    return true;
  }
  setEmailChecked(false);
  return false;
}

function checkPassword(password, setPasswordChecked) {
  if (password.length > 6) {
    setPasswordChecked(true);
    return true;
  }
  setPasswordChecked(false);
  return false;
}

function Login() {
  const [emailChecked, setEmailChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { email, setEmail, setPassword } = useContext(AppContext);

  const handleEmail = (e) => {
    if (checkEmail(e.target.value, setEmailChecked) === true) setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    if (checkPassword(e.target.value, setPasswordChecked) === true) setPassword(e.target.value);
  };

  const saveToStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  /*  const teclaEnter = (tecla, email) => {
      if (tecla.key === 'Enter' && emailChecked && passwordChecked) saveToStorage(email);
    };
   */
  return (
    <div>
      <HEADER />
      <SearchBar />
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
