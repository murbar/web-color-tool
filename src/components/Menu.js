import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ThemeControl from 'components/ThemeControl';
import RandomizeControl from 'components/RandomizeControl';
import AboutModal from 'components/AboutModal';
import IconButton from 'components/common/IconButton';
import { ReactComponent as MenuIcon } from 'icons/menu.svg';
import { ReactComponent as CloseIcon } from 'icons/x.svg';
import breakpoints from 'styles/breakpoints';

const expandedCss = css`
  ${breakpoints.below.tablet`
    padding: 1rem;
    z-index: 100;
    background: ${p => p.theme.menu.bgColor};
    ${IconButton} {
    color: ${p => p.theme.menu.textColor};
    &:hover {
      background: ${p => p.theme.menu.buttonHoverColor};
    }
  }
  `}
`;

const Styles = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4rem;
  transition: all 100ms;
  ${IconButton} {
    margin: 0 0 0.5rem 0;
    &:last-child {
      margin: 0;
    }
  }
  ${p => p.showing && expandedCss}
  ${breakpoints.tablet`
    ${IconButton} {
      margin: 0 1rem 0 0;
      &:last-child {
        margin: 0;
      }
    }
  `}
`;

const Toggle = styled.div`
  ${breakpoints.tablet(css`
    display: none;
  `)}
`;

const Expanded = styled.div`
  display: ${p => (p.showing ? 'flex' : 'none')};
  flex-direction: column;
  ${breakpoints.tablet(css`
    display: block;
  `)}
`;

export default function Menu({ state, callbacks }) {
  const { randomizeColor, toggleTheme } = callbacks;
  const [showing, setShowing] = useState(false);

  return (
    <Styles showing={showing}>
      <Toggle>
        <IconButton
          onClick={() => setShowing(prev => !prev)}
          title={`${showing ? 'Close' : 'Expand'} menu`}
        >
          {showing ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toggle>
      <Expanded showing={showing}>
        <RandomizeControl onClick={randomizeColor} />
        <ThemeControl onToggle={toggleTheme} toggled={state.darkMode} />
        <AboutModal />
      </Expanded>
    </Styles>
  );
}
