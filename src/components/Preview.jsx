import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';
import ColorValues from './ColorValues';
import { useSpring, animated } from 'react-spring';

const ColorDisplay = styled(animated.div)`
  height: 40vh;
  border-radius: 0.5em;
`;

export default function Preview({ colorValues }) {
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  const color = useSpring({
    config: { duration: 400 },
    background: rgbCSS,
    boxShadow: `0 0 1rem ${rgbCSS}`
  });

  return (
    <ColorDisplay style={color}>
      <ColorValues colorValues={colorValues} />
    </ColorDisplay>
  );
}
