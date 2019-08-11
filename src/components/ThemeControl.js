import React from 'react';
import IconButton from 'components/common/IconButton';
import { ReactComponent as Dark } from 'icons/moon.svg';
import { ReactComponent as Light } from 'icons/sun.svg';
import { recordGAEvent } from 'helpers';
import { usePreferences } from 'contexts/preferencesContext';

const ThemeControl = () => {
  const {
    preferences: { darkTheme },
    toggleTheme
  } = usePreferences();
  const title = `Toggle ${darkTheme ? 'light' : 'dark'} mode`;

  return (
    <IconButton
      onClick={() => {
        toggleTheme();
        recordGAEvent('User', 'Clicked', 'Menu - toggle theme');
      }}
      title={title}
    >
      {darkTheme ? <Light /> : <Dark />}
    </IconButton>
  );
};

export default ThemeControl;
