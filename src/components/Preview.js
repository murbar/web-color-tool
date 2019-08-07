import React from 'react';
import styled from 'styled-components';
import breakpoints from 'styles/media';
import colorConvert from 'colorConvert';
import ColorValues from 'components/ColorValues';
import { useSpring, animated } from 'react-spring';
import Harmonies from 'components/Harmonies';

const ColorDisplay = styled(animated.div)`
  height: 30vh;
  min-height: 25rem;
  margin: 0 -2rem 2rem;
  position: relative;
  overflow: hidden;
  ${breakpoints.tall`
    height: 40vh;
  `}
  ${breakpoints.tablet`
    border-radius: 0.5em;
    margin: 0 0 2rem;
  `}
`;

export default function Preview({ colorValues }) {
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  const color = useSpring({
    config: { duration: 400 },
    background: rgbCSS
  });

  return (
    <ColorDisplay style={color}>
      <ColorValues colorValues={colorValues} />
      <Harmonies colorValues={colorValues} />
    </ColorDisplay>
  );
}
