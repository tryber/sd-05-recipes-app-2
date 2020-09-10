import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
/* import Bebidas from './pages/Bebidas/Bebidas';
import ComidaDetalhes from './pages/Comidas/ComidaDetalhes/ComidaDetalhes';
import BebidaDetalhes from './pages/Bebidas/BebidaDetalhes/BebidaDetalhes'; */
import Provider from './contexts/Provider';
import Comidas from './pages/Comidas/Comidas';

function App() {
  return (
    <Provider>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/comidas" component={Comidas} />
            {/* <Route exact path="/bebidas" component={Bebidas} /> */}
            {/* <Route exact path="/comidas/:id" component={ComidaDetalhes} /> */}
            {/* <Route exact path="/bebidas/:id" component={BebidaDetalhes} /> */}
            {/* <Route exact path="/comidas/:id/in-progress" component={ComidaDetalhes} /> */}
            {/* <Route exact path="/bebidas/:id/in-progress" component={BebidaDetalhes} /> */}
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
