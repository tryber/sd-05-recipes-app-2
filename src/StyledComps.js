// import React from 'react';
import styled from 'styled-components';

export const HeaderDiv = styled.div`
  background-color: ${props => props.theme.bgColorHeadFoot};
`;

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
    border-radius: 15px;
    padding: 1vh 1vw;
  };

  @media screen and (min-width: 400px) {
    background-image: url(${props => props.theme.bgImgDesktop});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background-image 0.4s ease-in-out;
  }
`;

export const ShLikBtn = styled.button`
  background-color: ${props => props.theme.iconBg};
  border-radius: 50%;
  margin-right: 1vw;
  height: 40px;
  text-align: center;
  width: 40px;

  @media screen and (min-width: 400px) {
    height: 50px;
    width: 50px;

    img {
      margin-left: 2px;
    }
  }
`;

export const BgList = styled.div`
  background-color: ${props => props.theme.bgCard};
`;
