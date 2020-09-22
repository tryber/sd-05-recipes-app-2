// import React from 'react';
import styled from 'styled-components';

export const CardButton = styled.button`
  background-color: ${props => props.theme.body};
`;

export const CardBody = styled.div`
  background-color: ${props => props.theme.bgCard};
`;

export const BackgroundBody = styled.div`
  background-image: url(${props => props.theme.backgroundImage});

  p {
    background-color: ${props => props.theme.bgTextImg};
  }
`;
