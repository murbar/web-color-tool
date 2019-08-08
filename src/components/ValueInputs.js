import React from 'react';
import styled, { css } from 'styled-components';
import HexForm from 'components/HexForm';
import RgbForm from 'components/RgbForm';
import HslForm from 'components/HslForm';
import breakpoints from 'styles/breakpoints';

const StyledDiv = styled.div`
  margin: 3.5rem 0;
  & > div {
    margin-bottom: 1.5rem;
  }
  label {
    font-weight: bold;
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
