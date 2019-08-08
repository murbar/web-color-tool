import React from 'react';
import IconButton from 'components/common/IconButton';
import { ReactComponent as Dark } from 'icons/moon.svg';
import { ReactComponent as Light } from 'icons/sun.svg';
import { recordGAEvent } from 'helpers';

const ThemeControl = ({ onToggle, toggled }) => {
  const title = `Toggle ${toggled ? 'light' : 'dark'} mode`;
  return (
    <IconButton
      onClick={() => {
        onToggle();
        recordGAEvent('User', 'Clicked', 'Menu - toggle theme');
      }}
      title={title}
    >
      {toggled ? <Light /> : <Dark />}
    </IconButton>
  );
};

export default ThemeControl;
