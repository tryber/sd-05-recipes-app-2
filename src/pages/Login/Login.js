import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

/* função pro futuro: ao clicar no enter, fazer o login */
/* function teclaEnter(tecla) {
  if (tecla.key === 'Enter') {
    executarFunção();
  }
} */

export default function Login() {
  const { setEmail, setPassword } = useContext(AppContext);
  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="senha"
            onChange={(e) => setPassword(e.target.value)} />
        </label>
      </form>
      <Link to="/comidas">
        <button data-testid="login-submit-btn" type="button">
          Entrar
        </button>
      </Link>
    </div>
  );
}
