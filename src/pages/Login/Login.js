import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import './login.css';
import AppContext from '../../contexts/AppContext';
import logo1 from '../../images/logo_01.png';

const MyLogin = styled.div`
  background-image: url(${props => props.theme.backgroundImage});
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  height: 100vh;
  transition: background-image 0.4s ease-in-out;

  @media screen and (min-width: 400px) {
    background-image: url(${props => props.theme.bgImgDesktop});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background-image 0.4s ease-in-out;
  }
`;

const MyTitle = styled.h3`
  color: ${props => props.theme.text};;
  font-weight: 300;
  text-align: center;
  padding: 2vh 0;

  @media screen and (min-width: 400px) {
    font-size: 24pt;
  }
`;

function emailInput(handleEmail) {
  return (
    <div className="form-group">
      <input
        data-testid="email-input"
        type="email"
        name="email"
        id="email"
        onChange={(e) => handleEmail(e)}
        className="form-control form-input"
        placeholder="E-mail"
      />
    </div>
  );
}

function passwordInput(handlePassword) {
  return (
    <div className="form-group">
      <input
        data-testid="password-input"
        type="password"
        name="senha"
        id="password"
        onChange={(e) => handlePassword(e)}
        className="form-control form-input"
        placeholder="Senha"
      />
    </div>
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
  const history = useHistory();

  const handleEmail = (e) => {
    if (checkEmail(e.target.value, setEmailChecked) === true) setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    if (checkPassword(e.target.value, setPasswordChecked) === true) setPassword(e.target.value);
  };

  const saveToStorage = (email, history) => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push("/comidas");
  };

  /*  const teclaEnter = (tecla, email) => {
      if (tecla.key === 'Enter' && emailChecked && passwordChecked) saveToStorage(email);
    };
   */
  return (
    <MyLogin>
      <div className="login-container">
        <img className="logo" alt="Logo Panelinha" src={logo1}></img>
        <MyTitle>Welcome!</MyTitle>
        <form>
          {emailInput(handleEmail)}
          {passwordInput(handlePassword)}
        </form>
        <div to="/comidas" className="enter-button">
          <button
            className="btn button-laranja"
            data-testid="login-submit-btn"
            type="button"
            disabled={!(emailChecked && passwordChecked)}
            onClick={() => saveToStorage(email, history)}
          >
            Entrar
          </button>
        </div>
      </div>
    </MyLogin>
  );
}

export default Login;
