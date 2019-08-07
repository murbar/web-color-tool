import React from 'react';
import styled from 'styled-components';
import HexForm from './HexForm';
import RgbForm from './RgbForm';
import HslForm from './HslForm';

const StyledDiv = styled.div`
  margin: 3.5rem 0;
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

const ValueInputs = ({ setColor, colorValues }) => {
  return (
    <StyledDiv>
      <RgbForm setColor={setColor} colorValues={colorValues} />
      <HslForm setColor={setColor} colorValues={colorValues} />
      <HexForm setColor={setColor} colorValues={colorValues} />
    </StyledDiv>
  );
};

export default ValueInputs;
