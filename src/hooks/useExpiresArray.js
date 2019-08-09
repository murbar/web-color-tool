import { useState, useRef, useCallback } from 'react';

// items remove themselves from the array after a delay

const useExpiresArray = (initItems = [], defaultDelay = 1000) => {
  const [storage, setStorage] = useState(initItems);
  const index = useRef(0);

  const add = useCallback(
    (item, delay = defaultDelay) => {
      const newItem = {
        data: item,
        id: index.current++
      };
      newItem.timeoutId = setTimeout(() => {
        return setStorage(prev => prev.filter(item => item.id !== newItem.id));
      }, delay);
      setStorage(prev => [...prev, newItem]);
      return newItem;
    },
    [defaultDelay]
  );

  const remove = useCallback(
    itemId => {
      const item = storage.find(i => i.id === itemId);
      if (item) {
        clearTimeout(item.timeoutId);
        setStorage(prev => prev.filter(i => i.id !== itemId));
      }
    },
    [storage]
  );

  const clearTimeouts = useCallback(() => storage.forEach(i => clearTimeout(i.timeoutId)), [
    storage
  ]);

  const flush = () => {
    clearTimeouts();
    setStorage([]);
  };

  return {
    items: storage,
    add,
    remove,
    flush,
    count: storage.length
  };
};

export default useExpiresArray;
