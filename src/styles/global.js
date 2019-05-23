import { createGlobalStyle } from 'styled-components';
import media from './media';

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
    color: ${p => p.theme.textColor};
    background: ${p => p.theme.backgroundColor};
    font-family: ${p => p.theme.font};
    font-size: 1.6rem;
    line-height: 1.5;
    min-height: 100vh;
    ${media.tablet`
      font-size: 1.8rem;
    `}
  }
  a {
    color: inherit;
    text-decoration: none;
    box-shadow: inset 0 -0.1em 0 0 ${p => p.theme.textColor};
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }
  input[type='number'] {
      -moz-appearance:textfield;
  }
  input::selection {
    background: ${p => p.theme.highlightColor}
  }
`;
