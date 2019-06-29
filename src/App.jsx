import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import colorConvert from 'colorConvert';
import { randomRgbValues } from 'helpers';
import GlobalStyles from 'styles/global';
import { dark, light } from 'styles/themes';
import media from 'styles/media';
import Preview from 'components/Preview';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ThemeControl from 'components/ThemeControl';
import RandomizeControl from 'components/RandomizeControl';
import ValueInputs from 'components/ValueInputs';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useKeyPress from 'hooks/useKeyPress';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';
import useKeyboardQuery from 'hooks/useKeyboardQuery';
import useLocalStorageState from 'hooks/useLocalStorageState';
import ColorAdjustControls from 'components/ColorAdjustControls';

const StyledWrapper = styled.div`
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

const deriveColorState = (rgbValues = [0, 0, 0]) => {
  return {
    rgb: rgbValues,
    hsl: colorConvert.rgb.toHsl(rgbValues),
    hex: colorConvert.rgb.toHex(rgbValues)
  };
};

const randomColor = () => deriveColorState(randomRgbValues());

ReactGA.initialize('UA-140727716-1');

function App({ initialColor, darkMode, location }) {
  const [darkThemeToggle, setDarkThemeToggle] = useLocalStorageState('theme-preference', true);
  const [colorValues, setColorValues] = useState(
    initialColor ? deriveColorState(initialColor) : randomColor()
  );

  const setColor = rgbValues => {
    const [r, g, b] = rgbValues;
    setColorValues(deriveColorState([r || 0, g || 0, b || 0]));
  };

  const randomizeColor = () => {
    setColorValues(randomColor());
    ReactGA.event({
      category: 'User',
      action: 'Randomized color'
    });
  };

  const toggleTheme = () => setDarkThemeToggle(prev => !prev);

  useDocumentTitle(`#${colorValues.hex} - Color Converter | RGB - HSL - HEX`);
  useKeyboardQuery('using-keyboard');
  useAnalyticsPageView(location);

  const rKeyPress = useKeyPress('r');

  // extract to useKeyboardShortcuts given array of objects {key: , callback: }
  useEffect(() => {
    if (rKeyPress) randomizeColor();
  }, [rKeyPress]);

  useEffect(() => {
    if (initialColor) setColor(initialColor);
  }, [initialColor]);

  return (
    <ThemeProvider theme={darkThemeToggle ? dark : light}>
      <StyledWrapper>
        <GlobalStyles />
        <Header />
        <Controls>
          <ThemeControl onToggle={toggleTheme} toggled={darkMode} />
          <RandomizeControl onClick={randomizeColor} />
          <ColorAdjustControls setColor={setColor} colorValues={colorValues} />
        </Controls>
        <Preview colorValues={colorValues} />
        {/* <Swatch rgbValues={colorValues.rgb} /> */}
        <ValueInputs setColor={setColor} colorValues={colorValues} />
        <Footer />
      </StyledWrapper>
    </ThemeProvider>
  );
}

export default withRouter(App);
