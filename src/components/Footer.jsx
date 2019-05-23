import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <Styles>
      Made with{' '}
      <span role="img" aria-label="love">
        ❤️
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
