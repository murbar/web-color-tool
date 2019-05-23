import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import media from './styles/media';
import Preview from './components/Preview';
import colorConvert from './colorConvert';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeSwitch from './components/ThemeSwitch';
import ValueInputs from './components/ValueInputs';
import Button from './components/common/Button';
import useDocumentTitle from './hooks/useDocumentTitle';
import useKeyPress from './hooks/useKeyPress';

const Wrapper = styled.div`
  padding: 0 2rem 3rem;
  max-width: 100rem;
  margin: 0 auto;
  ${media.tablet`
      padding: 0 4rem 3rem;
    `}
`;

const Controls = styled.div`
  margin: -1rem 0 2rem;
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

ReactGA.initialize('UA-140727716-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App({ location, toggleTheme, darkMode }) {
  const initialState = parseLocation(location);
  const [colorValues, setColorValues] = useState(initialState);

  const setColor = rgbValues => {
    const [r, g, b] = rgbValues;
    setColorValues(deriveColorState([r || 0, g || 0, b || 0]));
  };

  const randomizeColor = () => {
    setColorValues(randomColorValues());
    ReactGA.event({
      category: 'User',
      action: 'Randomized color'
    });
  };

  useDocumentTitle(`#${colorValues.hex} - Color Converter | RGB - HSL - HEX`);

  const rKeyPress = useKeyPress('r');

  // extract to useKeyboardShortcuts given array of objects {key: , callback: }
  React.useEffect(() => {
    if (rKeyPress) randomizeColor();
  }, [rKeyPress]);

  return (
    <Wrapper>
      <Header />
      <Controls>
        <ThemeSwitch onToggle={toggleTheme} toggled={darkMode} />
        <Button onClick={randomizeColor}>Randomize</Button>
      </Controls>
      <Preview colorValues={colorValues} />
      <ValueInputs setColor={setColor} colorValues={colorValues} />
      <Footer />
    </Wrapper>
  );
}

export default withRouter(App);
