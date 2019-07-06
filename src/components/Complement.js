import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';
import { useSpring, animated } from 'react-spring';

const ComplementStyles = styled(animated.div)`
  width: 10rem;
  height: 4rem;
  border-radius: 0.5em;
`;

export default function Complement({ colorValues }) {
  const [h, s, l] = colorValues.hsl;
  const newHue = (h - 180) % 360;
  const hslCSS = colorConvert.hsl.toCSS([newHue, s, l]);
  const compColor = useSpring({
    config: { duration: 400 },
    background: hslCSS,
    boxShadow: `0 0 1rem ${hslCSS}`
  });

  return <ComplementStyles style={compColor}>Complement</ComplementStyles>;
}
