import { useEffect } from 'react';

export default function useKeyboardQuery(className) {
  useEffect(() => {
    const keyboardInUse = () => document.body.classList.add(className);
    const mouseInUse = () => document.body.classList.remove(className);

    document.body.addEventListener('keydown', keyboardInUse);
    document.body.addEventListener('mousedown', mouseInUse);
    return () => {
      document.body.removeEventListener('keydown', keyboardInUse);
      document.body.removeEventListener('mousedown', mouseInUse);
    };
  }, [className]);
}
