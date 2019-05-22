import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Preview from './components/Preview';
import colorConvert from './colorConvert';
import ThemeSwitch from './components/ThemeSwitch';
import Inputs from './components/ValueInputs';
import Button from './components/common/Button';
import useDocumentTitle from './hooks/useDocumentTitle';

const AppWrapper = styled.div`
  padding: 0 2rem 3rem;
`;

const Footer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Controls = styled.div`
  margin: 1rem 0;
  button {
    font-size: 0.8em;
  }
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

function App({ location, toggleTheme, darkMode }) {
  const initialState = parseLocation(location);
  const [colorValues, setColorValues] = useState(initialState);

  useDocumentTitle(`Color Multi-tool - #${colorValues.hex}`);

  const setColor = rgbValues => {
    const [r, g, b] = rgbValues;
    setColorValues(deriveColorState([r || 0, g || 0, b || 0]));
  };

  const randomizeColor = () => {
    setColorValues(randomColorValues());
  };

  return (
    <AppWrapper>
      <h1>Color Multi-tool</h1>
      <Controls>
        <ThemeSwitch onToggle={toggleTheme} toggled={darkMode} />
        <Button onClick={randomizeColor}>Randomize</Button>
      </Controls>
      <Preview colorValues={colorValues} />
      <h2>Inputs</h2>
      <Inputs setColor={setColor} colorValues={colorValues} />
      <Footer>
        Made with ❤️ and React by <a href="http://joelb.dev">Joel Bartlett</a>
        <br /> <a href="#github">Check out the code</a>
      </Footer>
    </AppWrapper>
  );
}

export default withRouter(App);
