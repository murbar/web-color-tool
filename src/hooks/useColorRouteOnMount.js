import React from 'react';
import { useBaseColor } from 'contexts/baseColorContext';
import { validHsl, validRgb, validHex } from 'colorUtils';
import colorConverter from 'colorConverter';
import { hslTo4x } from 'colorUtils';
import useRouter from 'hooks/useRouter';

const convertMap = {
  hsl: route => {
    const { h, s, l } = route.params;
    return validHsl(h, s, l) ? hslTo4x([h, s, l]) : null;
  },
  rgb: route => {
    const { r, g, b } = route.params;
    return validRgb(r, g, b) ? colorConverter.rgb.toHsl4x([r, g, b]) : null;
  },
  hex: route => {
    const { hex } = route.params;
    return validHex(hex) ? colorConverter.hex.toHsl4x(hex) : null;
  }
};

// helper to avoid linter complaining about empty dependency array
const useOnceOnMount = callback => React.useEffect(callback, []);

export default function useColorRouteOnMount() {
  const { setBaseHslPrecise } = useBaseColor();
  const { replace, matchRoute } = useRouter();
  const colorRoute = matchRoute(['/hsl/:h/:s/:l', '/rgb/:r/:g/:b', '/hex/:hex']);

  const clearRoute = () => replace('/');

  useOnceOnMount(() => {
    if (colorRoute?.isExact) {
      const type = colorRoute.url.slice(1, 4);

      if (type in convertMap) {
        const color = convertMap[type](colorRoute);
        if (color) {
          setBaseHslPrecise(color);
        } else {
          // invalid color values
          clearRoute();
        }
      }
    } else {
      // invalid color route
      clearRoute();
    }
  });
}
