import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from 'icons/user.svg';
import { ReactComponent as GitHubIcon } from 'icons/github.svg';
import config from 'config';

const Version = styled.div`
  font-family: ${p => p.theme.fontFixed};
  margin-bottom: 0.5rem;
`;

const StyledContainer = styled.div`
  padding: 4rem 0 2rem;
  text-align: center;
  font-size: 0.8em;
  a {
    box-shadow: none;
    margin: 0 0.25rem 0;
    padding: 0.5rem;
  }
  svg {
    height: 1.5em;
  }
`;

const Footer = () => {
  return (
    <StyledContainer>
      <Version className="v">v{config.version}</Version>
      <a href="https://joelb.dev" title="Joel Bartlett's portfolio">
        <UserIcon />
      </a>
      <a href="https://github.com/murbar/color-converter" title="See the code on GitHub">
        <GitHubIcon />
      </a>
    </StyledContainer>
  );
};

export default Footer;
