import React, { useMemo, useContext, useCallback } from 'react';
import useLocalStorageState from 'hooks/useLocalStorageState';
import config from 'config';

const PreferencesContext = React.createContext();

const PreferencesProvider = ({ children }) => {
  const { localStorageKeys } = config;
  const [preferences, setPreferences] = useLocalStorageState(localStorageKeys.preferences, true);

  const toggleTheme = useCallback(
    () =>
      setPreferences(prev => {
        return { ...prev, darkTheme: !prev.darkTheme };
      }),
    [setPreferences]
  );

  const contextValue = useMemo(() => ({ preferences, toggleTheme }), [preferences, toggleTheme]);

  return <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>;
};

const usePreferences = () => useContext(PreferencesContext);

export { PreferencesProvider, usePreferences };
