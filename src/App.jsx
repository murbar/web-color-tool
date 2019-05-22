import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Preview from './components/Preview';
import colorConvert from './colorConvert';
import Inputs from './components/ValueInputs';
import Button from './components/common/Button';
import { withRouter } from 'react-router-dom';

const AppWrapper = styled.div`
  padding: 0 2rem 3rem;
`;

const Randomizer = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const deriveColorState = rgbValues => {
  return {
    rgb: rgbValues,
    hsl: colorConvert.rgb.toHsl(rgbValues),
    hex: colorConvert.rgb.toHex(rgbValues)
  };
};

const random8Bit = () => Math.floor(Math.random() * 256);

const randomColorValues = () => deriveColorState([random8Bit(), random8Bit(), random8Bit()]);

// matches "?hsl=0,0,0", "?rgb=0,0,0", or "?hex=000000"
const parseLocation = location => {
  const { search } = location;
  // const hslRe = /g/;
  // const rgbRe = /g/;
  // const hexRe = /g/;

  if (search) {
    // if hsl re
    // if rgb re
    // if hex re
    return randomColorValues();
  } else {
    return randomColorValues();
  }
};

function App({ location }) {
  const initialState = parseLocation(location);
  const [colorValues, setColorValues] = useState(initialState);

  useEffect(() => console.log(colorValues), [colorValues]);

  const setColor = rgbValues => {
    setColorValues(deriveColorState(rgbValues));
  };

  const randomizeColor = () => {
    setColorValues(randomColorValues());
  };

  return (
    <AppWrapper>
      <h1>Color Multi-tool</h1>
      <Randomizer onClick={randomizeColor}>Randomize</Randomizer>
      <Preview colorValues={colorValues} />
      <h2>Inputs</h2>
      <Inputs setColor={setColor} colorValues={colorValues} />
    </AppWrapper>
  );
}

export default withRouter(App);
