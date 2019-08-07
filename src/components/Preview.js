import React, { useState } from 'react';
import styled from 'styled-components';
import breakpoints from 'styles/media';
import colorConvert from 'colorConvert';
import ColorValues from 'components/ColorValues';
import { useSpring, animated } from 'react-spring';
import HarmonyDisplay from 'components/HarmonyDisplay';
import HarmonyToggle from 'components/HarmonyToggle';

const ColorDisplay = styled(animated.div)`
  height: 30vh;
  min-height: 25rem;
  margin: 0 -2rem 0;
  position: relative;
  overflow: hidden;
  ${breakpoints.tall`
    height: 40vh;
  `}
  ${breakpoints.tablet`
    border-radius: 0.5em;
    margin: 0;
  `}
`;

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

export default function Preview({ colorValues }) {
  const [showingHarmony, setShowingHarmony] = useState(null);
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  const color = useSpring({
    config: { duration: 400 },
    background: rgbCSS
  });

  return (
    <Container>
      <ColorDisplay style={color}>
        <ColorValues colorValues={colorValues} />
        <HarmonyDisplay
          colorValues={colorValues}
          showing={showingHarmony}
          setShowing={setShowingHarmony}
        />
      </ColorDisplay>
      <HarmonyToggle showing={showingHarmony} setShowing={setShowingHarmony} />
    </Container>
  );
}
