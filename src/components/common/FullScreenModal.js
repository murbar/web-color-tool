import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${p => p.theme.fullScreenModalBgColor};
  pointer-events: auto;
  overflow: scroll;
`;

export default function FullScreenModal({ children, onClickOff }) {
  return ReactDOM.createPortal(
    <Styles
      onClick={e => {
        if (e.target.parentNode.id === 'modal') onClickOff(e);
      }}
    >
      {children}
    </Styles>,
    document.querySelector('#modal')
  );
}
