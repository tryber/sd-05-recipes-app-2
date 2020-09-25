import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;  
}
:root {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Raleway', sans-serif;
  --bg-img: url(${({ theme }) => `${theme.backgroundImage}`});
  --bg-color: #f5f5f5;
  --off-black: #141414;
  --off-white: #f5f5f5;
  --off-gray: #5c5c5c;
  --bege: #f2e7da;
  --laranja: #ff8600;
  --amarelo: #ffae0d;
}
body {
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  margin: 0;    
  padding: 0;    
  font-family: 'Raleway', sans-serif;    
  transition: all 0.3s linear ease;
}
`;
