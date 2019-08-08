import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import colorConvert from 'colorConvert';
import { randomRgbValues, trueMod, fireHotKey } from 'helpers';
import GlobalStyles from 'styles/global';
import { dark, light } from 'styles/themes';
import media from 'styles/breakpoints';
import Preview from 'components/Preview';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ColorAdjustControls from 'components/ColorAdjustControls';
import ValueInputs from 'components/ValueInputs';
import ValueSlider from 'components/ValueSliders';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useHotKeys from 'hooks/useHotKeys';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';
import useKeyboardQuery from 'hooks/useKeyboardQuery';
import useLocalStorageState from 'hooks/useLocalStorageState';

const StyledWrapper = styled.div`
  padding: 0 2rem 3rem;
  max-width: 100rem;
  margin: 0 auto;
  ${media.tablet`
      padding: 0 4rem 3rem;
    `}
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
  const [darkThemeToggle, setDarkThemeToggle] = useLocalStorageState('theme-pref', true);
  const [colorValues, setColorValues] = useLocalStorageState(
    'last-color-val',
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

  const adjustHue = hue => {
    const [h, s, l] = colorValues.hsl;
    const newHue = trueMod(h + hue, 360);
    setColor(colorConvert.hsl.toRgb([newHue, s, l]));
  };

  const adjustSat = sat => {
    const [h, s, l] = colorValues.hsl;
    const newSat = s + sat > 99 ? 99 : s + sat < 1 ? 1 : s + sat;
    setColor(colorConvert.hsl.toRgb([h, newSat, l]));
  };

  const adjustLum = lum => {
    const [h, s, l] = colorValues.hsl;
    const newLum = l + lum > 99 ? 99 : l + lum < 1 ? 1 : l + lum;
    setColor(colorConvert.hsl.toRgb([h, s, newLum]));
  };

  const toggleTheme = () => setDarkThemeToggle(prev => !prev);

  useDocumentTitle(
    `#${colorValues.hex} - Web color tool for developers | Convert RGB HSL Hex & explore harmonies`
  );
  useKeyboardQuery('using-keyboard');
  useAnalyticsPageView(location);
  useHotKeys({
    r: e => {
      fireHotKey(e, () => {
        randomizeColor();
      });
    },
    t: e => {
      fireHotKey(e, () => {
        toggleTheme();
      });
    },
    ArrowUp: e => {
      fireHotKey(e, () => {
        adjustLum(5);
      });
    },
    ArrowDown: e => {
      fireHotKey(e, () => {
        adjustLum(-5);
      });
    },
    ArrowRight: e => {
      fireHotKey(e, () => {
        adjustHue(12);
      });
    },
    ArrowLeft: e => {
      fireHotKey(e, () => {
        adjustHue(-12);
      });
    },
    s: e => {
      fireHotKey(e, () => {
        adjustSat(5);
      });
    },
    d: e => {
      fireHotKey(e, () => {
        adjustSat(-5);
      });
    }
  });

  // useEffect(() => {
  //   if (initialColor) setColor(initialColor);
  // }, [initialColor]);

  return (
    <ThemeProvider theme={darkThemeToggle ? dark : light}>
      <StyledWrapper>
        <GlobalStyles />
        <Header state={{ darkMode }} callbacks={{ toggleTheme, randomizeColor }} />
        <ValueInputs setColor={setColor} colorValues={colorValues} />
        <Preview colorValues={colorValues} setColor={setColor} />
        <ColorAdjustControls setColor={setColor} colorValues={colorValues} />
        <ValueSlider setColor={setColor} colorValues={colorValues} />
        <Footer />
      </StyledWrapper>
    </ThemeProvider>
  );
}

export default withRouter(App);
