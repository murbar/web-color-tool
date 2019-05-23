import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';

const Styles = styled.div`
  position: relative;
  background: ${p => p.color};
  margin: 1rem;
  height: 8rem;
  width: 12rem;
  border-radius: 1rem;
  overflow: hidden;
  .value {
    display: none;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    background: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 40%;
    font-size: 1.25rem;
    line-height: 1;
    font-family: ${p => p.theme.fontFixed};
    background: ${p => p.theme.overlayColor};
    color: ${p => p.theme.backgroundColor};
    cursor: default;
    span {
      text-align: center;
      display: block;
    }
  }
  &:hover .value {
    display: flex;
  }
`;

const Value = ({ data }) => {
  return (
    <div className="value">
      <span>HSL</span>
      <span>{data[0]}</span> <span>{data[1]}%</span> <span>{data[2]}%</span>
    </div>
  );
};

const Swatch = ({ rgbValues }) => {
  const rgbCSS = colorConvert.rgb.toCSS(rgbValues);
  const hslValues = colorConvert.rgb.toHsl(rgbValues);
  return (
    <Styles color={rgbCSS}>
      <Value data={hslValues} />
    </Styles>
  );
};

export default Swatch;
