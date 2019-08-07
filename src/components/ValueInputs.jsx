import React from 'react';
import styled, { css } from 'styled-components';
import HexForm from './HexForm';
import RgbForm from './RgbForm';
import HslForm from './HslForm';
import breakpoints from '../styles/media';

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
  ${breakpoints.tablet(css`
    display: flex;
    justify-content: space-between;
    & > div {
      margin-bottom: 0;
    }
    & > div:last-child input {
      margin-right: 0;
    }
  `)}
`;

const ValueInputs = ({ setColor, colorValues }) => {
  return (
    <StyledDiv>
      <HslForm setColor={setColor} colorValues={colorValues} />
      <RgbForm setColor={setColor} colorValues={colorValues} />
      <HexForm setColor={setColor} colorValues={colorValues} />
    </StyledDiv>
  );
};

export default ValueInputs;
