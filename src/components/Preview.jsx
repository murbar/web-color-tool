import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';
import ColorValues from './ColorValues';
import { useSpring, animated } from 'react-spring';

const ColorDisplay = styled(animated.div)`
  height: 45vh;
`;

export default function Preview({ colorValues }) {
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  const color = useSpring({
    background: rgbCSS,
    boxShadow: `0px 0 2rem 0px ${rgbCSS}`
  });
  const values = useSpring({ rgb: colorValues.rgb, hsl: colorValues.hsl });

  return (
    <ColorDisplay style={color}>
      <ColorValues values={values} />
    </ColorDisplay>
  );
}
