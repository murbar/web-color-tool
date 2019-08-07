import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Heart } from 'icons/heart.svg';

const StyledContainer = styled.div`
  padding: 2rem 0;
  text-align: center;
  svg {
    height: 1em;
    color: crimson;
    margin: 0 0 -0.25rem 0;
  }
`;

const Footer = () => {
  return (
    <StyledContainer>
      Made with{' '}
      <span role="img" aria-label="love">
        <Heart />
      </span>{' '}
      by{' '}
      <a href="https://joelb.dev" title="Joel Bartlett's portfolio">
        Joel Bartlett
      </a>
      <br />{' '}
      <a href="https://github.com/murbar/color-converter" title="See the code on GitHub">
        Have a look at the code
      </a>
    </StyledContainer>
  );
};

export default Footer;
