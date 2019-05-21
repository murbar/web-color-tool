import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  position: absolute;
  z-index: 100;
  top: 1rem;
  left: 1rem;
  input {
    margin: 0;
    display: block;
  }
`;

const ThemeSwitch = ({ onToggle }) => {
  return (
    <Styles>
      <input type="checkbox" onChange={onToggle} />
    </Styles>
  );
};

export default ThemeSwitch;
