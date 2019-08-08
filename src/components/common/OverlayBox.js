import React from 'react';
import styled, { css } from 'styled-components';
import breakpoints from 'styles/breakpoints';

const Styles = styled.div`
  background: ${p => p.theme.backgroundColor};
  padding: 1rem;
  box-shadow: ${p => p.theme.hudShadow};
  border-radius: 1rem;
  margin-bottom: 1rem;
  position: relative;
  pointer-events: auto;
  overflow: scroll;
  max-width: 100%;
  max-height: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  h2 {
    margin: 0;
  }
  ${breakpoints.tablet(css`
    width: 60rem;
  `)}
`;

export default function OverlayBox({ children }) {
  return <Styles>{children}</Styles>;
}
