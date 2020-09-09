import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

function Login() {
  const [emailChecked, setEmailChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { email, setEmail, setPassword } = useContext(AppContext);

  const checkEmail = (email) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (regex.test(email) === true) setEmailChecked(true);
  };

  const checkPassword = (password) => {
    if (password.length > 6) setPasswordChecked(true);
  };

  const handleEmail = (e) => {
    checkEmail(e.target.value);
    if (checkEmail === true) setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    checkPassword(e.target.value);
    if (checkPassword === true) setPassword(e.target.value);
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
      <form>
        <label htmlFor="email">
          Email:
      <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={(e) => handleEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha:
      <input
            data-testid="password-input"
            type="password"
            name="senha"
            onChange={(e) => handlePassword(e.target.value)}
          />
        </label>
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
