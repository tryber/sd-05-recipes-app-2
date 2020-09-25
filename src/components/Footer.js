import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import './header.css';
import drinks from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import AppContext from '../contexts/AppContext';

const FooterDiv = styled.div`
  background-color: ${props => props.theme.bgColorHeadFoot};
`;

function handleClick(path, setSelecCategory, history) {
  setSelecCategory('');
  history.push(`/${path}`);
}

export default function Footer() {
  const history = useHistory();
  const { setSelecCategory } = useContext(AppContext);
  return (
    <FooterDiv className="navbar fixed-bottom footer-comp" data-testid="footer">
      <button onClick={() => handleClick('comidas', setSelecCategory, history)}>
        <img alt="comidas" className="nav-icon" data-testid="food-bottom-btn" src={meal} />
      </button>
      <button onClick={() => handleClick('explorar', setSelecCategory, history)}>
        <img data-testid="explore-bottom-btn" className="nav-icon" alt="explorar" src={explore} />
      </button>
      <button
        data-testid="drinks-bottom-btn"
        onClick={() => handleClick('bebidas', setSelecCategory, history)}
        src={drinks}
      >
        <img alt="drinks" className="nav-icon" src={drinks} />
      </button>
    </FooterDiv>
  );
}
