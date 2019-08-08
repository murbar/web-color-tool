import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import OverlayBox from 'components/common/OverlayBox';
import { useTransition, animated } from 'react-spring';

const Styles = styled(animated.div)`
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
  transform: scale(1);
  will-change: transform, opacity;
`;

export default function FullScreenModal({ children, onClickOff, isShowing }) {
  const overlayTransition = useTransition(isShowing, null, {
    // config: { duration: 1000 },
    from: {
      opacity: 0
      // transform: 'scale(1.15)'
    },
    enter: {
      opacity: 1
      // transform: 'scale(1)'
    },
    leave: {
      opacity: 0
      // transform: 'scale(1.15)'
    }
  });

  return overlayTransition.map(
    ({ item, key, props }) =>
      item &&
      ReactDOM.createPortal(
        <Styles
          style={props}
          key={key}
          onClick={e => {
            if (e.target.parentNode.id === 'modal') onClickOff(e);
          }}
        >
          <OverlayBox style={props} key={key}>
            {children}
          </OverlayBox>
        </Styles>,
        document.querySelector('#modal')
      )
  );
}
