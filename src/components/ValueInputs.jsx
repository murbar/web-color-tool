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
    margin-right: 1rem;
  }
  input {
    margin-right: 1rem;
  }
`;

const Inputs = ({ setColor, colorValues }) => {
  return (
    <Styles>
      <HexForm setColor={setColor} colorValues={colorValues} />
      <RgbForm setColor={setColor} colorValues={colorValues} />
      <HslForm setColor={setColor} colorValues={colorValues} />
    </Styles>
  );
};

export default Inputs;
