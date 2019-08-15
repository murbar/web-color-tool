import React from 'react';
import styled, { css } from 'styled-components';
import HslFields from 'components/HslFields';
import RgbFields from 'components/RgbFields';
import HexField from 'components/HexField';
import { useBaseColor } from 'contexts/baseColorContext';
import breakpoints from 'styles/breakpoints';

const StyledDiv = styled.div`
  margin: 3.5rem 0 1.5rem;
  & > div {
    margin-bottom: 1.5rem;
  }
  label {
    font-weight: bold;
    display: inline-block;
    width: 3em;
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

const ValueInputs = () => {
  const { baseColor, setBaseHslPrecise } = useBaseColor();

  return (
    <StyledDiv>
      <HslFields setColor={setBaseHslPrecise} baseColor={baseColor} />
      <RgbFields setColor={setBaseHslPrecise} baseColor={baseColor} />
      <HexField setColor={setBaseHslPrecise} baseColor={baseColor} />
    </StyledDiv>
  );
};

export default ValueInputs;
