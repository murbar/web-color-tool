import React from 'react';
import styled from 'styled-components';
import colorConvert from 'colorConvert';
import Button from 'components/common/Button';

const Styles = styled.div`
  button {
    margin-bottom: 1.5rem;
    margin-right: 1rem;
    font-size: 0.8em;
  }
`;

const ColorAdjustControls = ({ setColor, colorValues }) => {
  let [h, s, l] = colorValues.hsl;

  const convertAndSet = hslValues => {
    const rgbValues = colorConvert.hsl.toRgb(hslValues);
    setColor(rgbValues);
  };

  const lighten = () => {
    l = l >= 90 ? 100 : l + 10;
    // maybe just return early if lightness over 90
    convertAndSet([h, s, l]);
  };

  const darken = () => {
    l = l <= 10 ? 0 : l - 10;
    convertAndSet([h, s, l]);
  };

  const saturate = () => {
    s = s >= 90 ? 100 : s + 10;
    convertAndSet([h, s, l]);
  };

  const desaturate = () => {
    s = s <= 10 ? 0 : s - 10;
    convertAndSet([h, s, l]);
  };

  return (
    <Styles>
      <Button onClick={lighten}>Lighten</Button>
      <Button onClick={darken}>Darken</Button>
      <Button onClick={saturate}>Saturate</Button>
      <Button onClick={desaturate}>Desaturate</Button>
    </Styles>
  );
};

export default ColorAdjustControls;
