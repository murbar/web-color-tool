import React from 'react';
import styled from 'styled-components';
import media from '../styles/media';
import colorConvert from '../colorConvert';
import ColorValues from './ColorValues';
import { useSpring, animated } from 'react-spring';

const ColorDisplay = styled(animated.div)`
  height: 30vh;
  min-height: 25rem;
  margin: 0 -2rem;
  padding: 1rem 1.5rem;
  ${media.tall`
    height: 40vh;
  `}
  ${media.tablet`
    border-radius: 0.5em;
    margin: 0;
    padding: 1rem 1.5rem;
  `}
`;

const SpecText = styled.div`
  font-size: 1.75em;
  width: 16ch;
`;

export default function Preview({ colorValues }) {
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  // const [r, g, b] = colorValues.rgb;
  // const shadow = `rgba(${r}, ${g}, ${b}, 0.3)`;
  const color = useSpring({
    config: { duration: 400 },
    background: rgbCSS,
    boxShadow: `0 0 1rem ${rgbCSS}`
    // boxShadow: `0 0 0 0.5rem ${shadow}, 0 0 0 0.9rem ${shadow}, 0 0 0 1.2rem ${shadow}`
  });

  return (
    <ColorDisplay style={color}>
      {/* <SpecText>The quick brown fox jumps over the lazy dog.</SpecText> */}
      <ColorValues colorValues={colorValues} />
    </ColorDisplay>
  );
}
