import React from 'react';
// import styled from 'styled-components';
import Button from './common/Button';

// const Styles = styled.div``;

const ThemeSwitch = ({ onToggle, toggled }) => {
  return <Button onClick={onToggle}>{toggled ? 'Light' : 'Dark'} mode</Button>;
};

export default ThemeSwitch;
