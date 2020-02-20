import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ThemeControl from 'components/ThemeControl';
import RandomizeControl from 'components/RandomizeControl';
import IconButton from 'components/common/IconButton';
import useClickOutside from 'hooks/useClickOutside';
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
    &:last-of-type {
      margin: 0;
    }
  }
  ${p => p.showing && expandedCss}
  ${breakpoints.tablet`
    ${IconButton} {
      margin: 0 1rem 0 0;
      &:last-of-type {
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

export default function Menu() {
  const [showing, setShowing] = useState(false);
  const clickOutsideRef = useClickOutside(() => {
    if (showing) setShowing(false);
  });

  return (
    <Styles showing={showing} ref={clickOutsideRef}>
      <Toggle>
        <IconButton
          onClick={() => setShowing(prev => !prev)}
          title={`${showing ? 'Close' : 'Expand'} menu`}
        >
          {showing ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toggle>
      <Expanded showing={showing}>
        <RandomizeControl />
        <ThemeControl />
      </Expanded>
    </Styles>
  );
}
