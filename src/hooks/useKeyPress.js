import { useState, useEffect } from 'react';

export default function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);
  let currentKey = '';

  useEffect(() => {
    const downHandler = ({ key }) => {
      // check for long press
      if (currentKey === targetKey) return;

      if (key === targetKey) {
        setKeyPressed(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        currentKey = key;
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
        currentKey = '';
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}
