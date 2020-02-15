import React, { createContext, useMemo, useCallback, useContext } from 'react';
import useLocalStorageState from 'hooks/useLocalStorageState';
import colorConverter from 'colorConverter';
import { randomRgbValues, hslTo4x } from 'colorUtils';
import { trueMod } from 'helpers';
import config from 'config';
import useRouter from 'hooks/useRouter';

// store hsl values at 4x precision - H 360x4, S 100x4, L 100x4
const calcColorState = (hslValues4x = [0, 0, 0]) => {
  const hslValues = hslValues4x.map(v => v / 4);
  const hslValuesRounded = hslValues.map(v => Math.round(v));
  const rgb = colorConverter.hsl4x.toRgb(hslValues4x);
  const hex = colorConverter.rgb.toHex(rgb);
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
  const hsl = colorConverter.rgb.toHsl(rgb);
  return calcColorState(hslTo4x(hsl));
};

const BaseColorContext = createContext();

const BaseColorProvider = ({ children }) => {
  const { localStorageKeys } = config;
  const [baseColor, setBaseColor] = useLocalStorageState(
    localStorageKeys.baseColor,
    randomizeColorState()
  );
  const { replace } = useRouter();

  const timeout = React.useRef(null);
  React.useEffect(() => {
    const { hsl } = baseColor;

    // setting history more than 100x in 30secs is a browser security violation, crashes app
    // can happen while scrubbing through the value sliders
    timeout.current = setTimeout(
      () => replace(`/hsl/${hsl[0]}/${hsl[1]}/${hsl[2]}`),
      150
    );
    return () => clearTimeout(timeout.current);
  }, [baseColor, replace]);

  const setHsl = useCallback(
    hslValues => {
      const [h, s, l] = hslTo4x(hslValues);
      setBaseColor(calcColorState([h || 0, s || 0, l || 0]));
    },
    [setBaseColor]
  );

  const setHslPrecise = useCallback(
    hslValues4x => {
      const [h, s, l] = hslValues4x;
      setBaseColor(calcColorState([h || 0, s || 0, l || 0]));
    },
    [setBaseColor]
  );

  const randomize = useCallback(() => {
    setBaseColor(randomizeColorState());
  }, [setBaseColor]);

  const contextValue = useMemo(() => {
    const adjustHue = hue => {
      const [h, s, l] = baseColor.hsl4x;
      const adjustment = hue * 4;
      const newHue = trueMod(h + adjustment, 360 * 4);
      setHslPrecise([newHue, s, l]);
    };

    const adjustSat = sat => {
      const [h, s, l] = baseColor.hsl4x;
      const adjustment = sat * 4;
      const newSat = s + adjustment > 400 ? 400 : s + adjustment < 0 ? 0 : s + adjustment;
      setHslPrecise([h, newSat, l]);
    };

    const adjustLum = lum => {
      const [h, s, l] = baseColor.hsl4x;
      const adjustment = lum * 4;
      const newLum = l + adjustment > 400 ? 400 : l + adjustment < 0 ? 0 : l + adjustment;
      setHslPrecise([h, s, newLum]);
    };

    return {
      baseColor,
      setBaseHsl: setHsl,
      setBaseHslPrecise: setHslPrecise,
      adjustBaseHue: adjustHue,
      adjustBaseSat: adjustSat,
      adjustBaseLum: adjustLum,
      randomizeBase: randomize
    };
  }, [baseColor, randomize, setHsl, setHslPrecise]);

  return (
    <BaseColorContext.Provider value={contextValue}>{children}</BaseColorContext.Provider>
  );
};

const useBaseColor = () => useContext(BaseColorContext);

export { BaseColorProvider, useBaseColor };
