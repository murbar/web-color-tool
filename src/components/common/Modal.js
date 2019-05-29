import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { useTransition, animated } from 'react-spring';

// https://developers.google.com/web/fundamentals/design-and-ux/animations/animating-modal-views

const ModalOverlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.75);
  transform: scale(1);
  will-change: transform, opacity;
`;

const ModalContent = styled(animated.div)`
  color: black;
  background: white;
  border-radius: 2rem;
  margin: 10% auto;
  padding: 1.5rem;
  min-width: 30rem;
`;

const Modal = ({ isShowing, hide, children }) => {
  const overlayTransition = useTransition(isShowing, null, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  const modalTransition = useTransition(isShowing, null, {
    from: {
      opacity: 0,
      transform: 'scale(1.15)'
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 0,
      transform: 'scale(1.15)'
    }
  });

  return overlayTransition.map(
    ({ item, key, props }) =>
      item &&
      ReactDOM.createPortal(
        <ModalOverlay style={props} key={key}>
          {modalTransition.map(
            ({ item, key, props }) =>
              item && (
                <ModalContent style={props} key={key}>
                  Modal content
                  <button onClick={hide}>Close</button>
                </ModalContent>
              )
          )}
        </ModalOverlay>,
        document.body
      )
  );
};

export default Modal;
