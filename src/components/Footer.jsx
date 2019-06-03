import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Heart } from 'icons/heart.svg';

const Styles = styled.div`
  padding: 2rem 0;
  text-align: center;
  svg {
    height: 1em;
    color: crimson;
    margin: 0 -0.25rem;
  }
`;

const Footer = () => {
  return (
    <Styles>
      Made with{' '}
      <span role="img" aria-label="love">
        <Heart />
      </span>{' '}
      and React by{' '}
      <a href="https://joelb.dev" title="Joel Bartlett's portfolio">
        Joel Bartlett
      </a>
      <br />{' '}
      <a href="https://github.com/murbar/color-converter" title="See the code on GitHub">
        Check out the code
      </a>
    </Styles>
  );
};

export default Footer;
