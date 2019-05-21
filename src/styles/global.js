import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    color: ${p => p.theme.backgroundColor};
    background: ${p => p.theme.textColor};;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.8rem;
    line-height: 1.5;
    min-height: 100vh;
  }
`;
