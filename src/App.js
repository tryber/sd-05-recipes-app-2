import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login/Login';
import ComidaDetalhes from './pages/Comidas/ComidaDetalhes/ComidaDetalhes';
import Provider from './contexts/Provider';
import ComidaInProgress from './pages/Comidas/ComidaDetalhes/ComidaInProgress';
import Home from './pages/Home/Home';
import Explorar from './pages/Explorar/Explorar';
import ExplorarComOuBeb from './pages/Explorar/ExplorarComOuBeb';
import ExplorarIngredientes from './pages/Explorar/ExplorarIngredientes';
import ExplorarArea from './pages/Explorar/ExplorarArea';
import Perfil from './pages/Perfil/Perfil';
import ReceitasFeitas from './pages/Perfil/ReceitasFeitas/ReceitasFeitas';
import ReceitasFavoritas from './pages/Perfil/ReceitasFavoritas/ReceitasFavoritas';
import NotFound from './components/NotFound';
import Header from './components/Header';


import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import GlobalTheme from "./global";
import styled from "styled-components";
import sun from './images/sun.svg';
import moon from './images/moon.svg';

const ButtonChange = styled.button`
  background-color: var(--amarelo);
  height: 30px;
  border-radius: 50%;
  position: fixed;
  top: 1.5vh;
  left: 2vw;
  z-index: 99999;
  text-align: left;
  border: none;
  outline: none;
  :focus {
    outline: none;
  }
  :hover {
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  }

  img {
    height: 20px;
  }

  @media screen and (min-width: 400px) {
    height: 40px;
    
    img {
    height: 30px;
  }
  }
`;


function App() {
  const [ theme, setTheme ] = useState('light');

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalTheme />
      <Provider>
        <div>
        <ButtonChange onClick={toggleTheme}>
          <img src={theme === 'light' ? sun : moon } alt="theme mode" />
        </ButtonChange>
          <BrowserRouter>
            {/* <Header /> */}
            <Switch>
              <Route exact path="/comidas" component={Home} />
              <Route exact path="/bebidas" component={Home} />
              <Route exact path="/comidas/:id" component={ComidaDetalhes} />
              <Route exact path="/bebidas/:id" component={ComidaDetalhes} />
              <Route exact path="/comidas/:id/in-progress" component={ComidaInProgress} />
              <Route exact path="/bebidas/:id/in-progress" component={ComidaInProgress} />
              <Route exact path="/explorar/comidas/area" component={ExplorarArea} />
              <Route exact path="/explorar/bebidas/ingredientes" component={ExplorarIngredientes} />
              <Route exact path="/explorar/comidas/ingredientes" component={ExplorarIngredientes} />
              <Route exact path="/explorar/bebidas" component={ExplorarComOuBeb} />
              <Route exact path="/explorar/comidas" component={ExplorarComOuBeb} />
              <Route exact path="/explorar" component={Explorar} />
              <Route exact path="/perfil" component={Perfil} />
              <Route exact path="/receitas-feitas" component={ReceitasFeitas} />
              <Route exact path="/receitas-favoritas" component={ReceitasFavoritas} />
              <Route exact path="/" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
