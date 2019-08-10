import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global';
import colorConvert from 'colorConvert';
import { randomRgbValues, trueMod, initializeGA, hslTo4x } from 'helpers';
import config from 'config';
import { dark, light } from 'styles/themes';
import breakpoints from 'styles/breakpoints';
import ColorDisplay from 'components/ColorDisplay';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ColorAdjustControls from 'components/ColorAdjustControls';
import ValueInputs from 'components/ValueInputs';
import ValueSlider from 'components/ValueSliders';
import HotKeys from 'components/HotKeys';
import useExpiresArray from 'hooks/useExpiresArray';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';
import useKeyboardQuery from 'hooks/useKeyboardQuery';
import useLocalStorageState from 'hooks/useLocalStorageState';

const AppStyles = styled.div`
  padding: 0 2rem 3rem;
  max-width: 100rem;
  margin: 0 auto;
  ${breakpoints.tablet`
      padding: 0 4rem 3rem;
    `}
`;

// store hsl values at 4x precision - H 360x4, S 100x4, L 100x4
const deriveColorState = (hslValues4x = [0, 0, 0]) => {
  const hslValues = hslValues4x.map(v => v / 4);
  const hslValuesRounded = hslValues.map(v => Math.round(v));
  const rgb = colorConvert.hsl4x.toRgb(hslValues4x);
  const hex = colorConvert.rgb.toHex(rgb);
  return {
    hsl4x: hslValues4x,
    hslNormalized: hslValues,
    hsl: hslValuesRounded,
    rgb,
    hex
  };
};

const randomizeColorState = () => {
  const rgb = randomRgbValues();
  const hsl = colorConvert.rgb.toHsl(rgb);
  return deriveColorState(hslTo4x(hsl));
};

initializeGA();

function App({ initialColorHsl, location }) {
  const { localStorageStrings, pageTitle } = config;
  const [darkThemeToggle, setDarkThemeToggle] = useLocalStorageState(
    localStorageStrings.theme,
    true
  );
  const [colorValues, setColorValues] = useLocalStorageState(
    localStorageStrings.color,
    initialColorHsl ? deriveColorState(hslTo4x(initialColorHsl)) : randomizeColorState()
  );
  const userMessages = useExpiresArray([], 2000);

  const setColorHsl = React.useCallback(
    hslValues => {
      const [h, s, l] = hslTo4x(hslValues);
      setColorValues(deriveColorState([h || 0, s || 0, l || 0]));
    },
    [setColorValues]
  );

  const setColorHslPrecise = React.useCallback(
    hslValues4x => {
      const [h, s, l] = hslValues4x;
      setColorValues(deriveColorState([h || 0, s || 0, l || 0]));
    },
    [setColorValues]
  );

  const randomizeColor = () => {
    setColorValues(randomizeColorState());
  };

  const adjustHue = hue => {
    const [h, s, l] = colorValues.hsl4x;
    const adjustment = hue * 4;
    const newHue = trueMod(h + adjustment, 360 * 4);
    setColorHslPrecise([newHue, s, l]);
  };

  const adjustSat = sat => {
    const [h, s, l] = colorValues.hsl4x;
    const adjustment = sat * 4;
    const newSat = s + adjustment > 399 ? 399 : s + adjustment < 0 ? 0 : s + adjustment;
    setColorHslPrecise([h, newSat, l]);
  };

  const adjustLum = lum => {
    const [h, s, l] = colorValues.hsl4x;
    const adjustment = lum * 4;
    const newLum = l + adjustment > 399 ? 399 : l + adjustment < 0 ? 0 : l + adjustment;
    setColorHslPrecise([h, s, newLum]);
  };

  const toggleTheme = () => setDarkThemeToggle(prev => !prev);

  useDocumentTitle(`#${colorValues.hex} - ${pageTitle}`);

  useKeyboardQuery('using-keyboard');

  useAnalyticsPageView(location);

  useEffect(() => {
    if (initialColorHsl) setColorHsl(initialColorHsl);
  }, [initialColorHsl, setColorHsl]);

  return (
    <ThemeProvider theme={darkThemeToggle ? dark : light}>
      <AppStyles>
        <GlobalStyles />
        <HotKeys
          callbacks={{
            randomizeColor,
            toggleTheme,
            adjustLum,
            adjustHue,
            adjustSat,
            addMessage: userMessages.add
          }}
          colorValues={colorValues}
        />
        <Header state={{ darkThemeToggle }} callbacks={{ toggleTheme, randomizeColor }} />
        <ValueInputs setColor={setColorHslPrecise} colorValues={colorValues} />
        <ColorDisplay
          colorValues={colorValues}
          setColor={setColorHslPrecise}
          userMessages={userMessages}
        />
        <ColorAdjustControls setColor={setColorHslPrecise} colorValues={colorValues} />
        <ValueSlider setColor={setColorHslPrecise} colorValues={colorValues} />
        <Footer />
      </AppStyles>
    </ThemeProvider>
  );
}

export default withRouter(App);
