import { useEffect, useRef } from 'react';

export default function useClickOutside(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClickAway = e => {
      if (ref && !ref.current.contains(e.target)) {
        callback(e);
      }
    };

    window.addEventListener('click', handleClickAway);
    return () => window.removeEventListener('click', handleClickAway);
  }, [callback]);

  return ref;
}
