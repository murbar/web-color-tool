import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  opacity: ${p => p.opacity};
  display: none;
`;

// currently does not work as expected, need to refactor
export default function HideAfterDelay({ children, delay = 1000, ...props }) {
  const [visible, setVisible] = useState(true);
  const timer = useRef();

  useEffect(() => {
    const setTimer = () => {
      if (timer.current !== null) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setVisible(false);
        timer.current = null;
      }, delay);
    };

    setTimer();
    setVisible(true);

    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, [delay, children]);

  return visible ? (
    <Styles delay={delay} className={props.className}>
      {children}
    </Styles>
  ) : null;
}
