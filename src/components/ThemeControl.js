import React from 'react';
// import styled from 'styled-components';
import IconButton from 'components/common/IconButton';
import { ReactComponent as Dark } from 'icons/moon.svg';
import { ReactComponent as Light } from 'icons/sun.svg';

const ThemeControl = ({ onToggle, toggled }) => {
  const title = `Toggle ${toggled ? 'light' : 'dark'} mode`;
  return (
    <IconButton onClick={onToggle} title={title}>
      {toggled ? <Light /> : <Dark />}
    </IconButton>
  );
};

export default ThemeControl;
