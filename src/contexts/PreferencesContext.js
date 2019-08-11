import React, { useMemo, useContext } from 'react';
import useLocalStorageState from 'hooks/useLocalStorageState';
import config from 'config';

const PreferencesContext = React.createContext();

const PreferencesProvider = ({ children }) => {
  const { localStorageKeys } = config;
  const [preferences, setPreferences] = useLocalStorageState(localStorageKeys.preferences, true);

  const contextValue = useMemo(() => {
    console.log('changing');
    const toggleTheme = () =>
      setPreferences(prev => {
        return { ...prev, darkTheme: !prev.darkTheme };
      });

    return { preferences, toggleTheme };
  }, [preferences, setPreferences]);

  return <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>;
};

const usePreferences = () => useContext(PreferencesContext);

export { PreferencesProvider, usePreferences };
