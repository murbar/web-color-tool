import React from 'react';
import styled from 'styled-components';
import HexForm from './HexForm';
import RgbForm from './RgbForm';
import HslForm from './HslForm';

const Styles = styled.div`
  & > div {
    margin-bottom: 1.5rem;
  }
  label {
    font-family: 'Source Code Pro', monospace;
    margin-right: 1rem;
  }
  input {
    margin-right: 1rem;
  }
`;

const Inputs = ({ setColor, colorValues }) => {
  return (
    <Styles>
      <h2>Inputs</h2>
      <RgbForm setColor={setColor} colorValues={colorValues} />
      <HslForm setColor={setColor} colorValues={colorValues} />
      <HexForm setColor={setColor} colorValues={colorValues} />
    </Styles>
  );
};

export default Inputs;
