import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';
import ColorValues from './ColorValues';

const Color = styled.div`
  height: 45vh;
  background: ${p => p.rgbCSS};
  box-shadow: 0px 0 2rem 0px ${p => p.rgbCSS};
`;

export default function Preview({ colorValues }) {
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  return (
    <>
      <Color rgbCSS={rgbCSS}>
        <ColorValues values={colorValues} />
      </Color>
    </>
  );
}
