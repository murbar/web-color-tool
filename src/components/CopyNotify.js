import React from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

const Styles = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  pointer-events: none;
  font-weight: bold;
  color: ${p => (p.isBright ? p.theme.colors.offBlack : p.theme.colors.offWhite)};
  opacity: 1;
`;

export default function CopyNotify({ messages, isBright }) {
  // only want to display the last message in this case
  const message = messages.count ? [messages.items[messages.count - 1]] : null;
  const fadeTransition = useTransition(message, m => (m ? m.id : 0), {
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

  return fadeTransition.map(
    ({ item, key, props }) =>
      item && (
        <Styles isBright={isBright} key={key}>
          <animated.span style={props}>{item.data}</animated.span>
        </Styles>
      )
  );
}
