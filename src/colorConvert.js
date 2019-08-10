import { trueMod } from 'helpers';
import config from 'config';

const HSL_SCALE = config.hslScaleFactor;

// 'fff'/'FFFFFF' -> ['FF', 'FF', 'FF']
const splitHex = hexValue => {
  const val = hexValue.toUpperCase();
  const length = val.length;

  if (length === 3) return [...val].map(v => v + v);
  if (length === 6) return [val.slice(0, 2), val.slice(2, 4), val.slice(4, 6)];

  throw new Error(`Invalid hex value "${hexValue}"`);
};

// [255, 255, 255] -> 'FFFFFF'
const rgbToHex = rgbValues => {
  return rgbValues
    .map(n =>
      parseInt(n)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')
    .toUpperCase();
};

// [255, 255, 255] -> [1440, 400, 400]
// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
// https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const rgbToHsl4x = rgbValues => {
  // convert to value between 0 and 1
  const rgb = rgbValues.map(n => parseInt(n) / 255);
  const [min, max] = [Math.min(...rgb), Math.max(...rgb)];
  const L = (min + max) / 2;
  const lum = Math.round(L * 100 * HSL_SCALE);

  // no sat, so no hue, we have a shade of gray
  if (max === min) return [0, 0, lum];

  const chroma = max - min;
  const S = chroma / (1 - Math.abs(2 * L - 1));
  const sat = Math.round(S * 100 * HSL_SCALE);

  const [R, G, B] = rgb;
  const hueMaxChannel = {
    '0': (G - B) / chroma + (G < B ? 6 : 0),
    '1': (B - R) / chroma + 2,
    '2': (R - G) / chroma + 4
  };
  const H = hueMaxChannel[rgb.indexOf(max)];
  const hue = Math.round(H * 60 * HSL_SCALE);
  return [hue, sat, lum];
};

// [255, 255, 255] -> [360, 100, 100]
const rgbToHsl = rgbValues => {
  const hsl4x = rgbToHsl4x(rgbValues);
  return hsl4x.map(v => Math.round(v / 4));
};

// 'FFF'/'FFFFFF' -> [255, 255, 255]
const hexToRgb = hexValue => {
  return splitHex(hexValue).map(h => parseInt(h, 16));
};

// 'FFF'/'FFFFFF' -> [360, 100, 100]
const hexToHsl = hexValue => {
  const rgbValues = hexToRgb(hexValue);
  return rgbToHsl(rgbValues);
};

// 'FFF'/'FFFFFF' -> [1440, 400, 400]
const hexToHsl4x = hexValue => {
  const rgbValues = hexToRgb(hexValue);
  return rgbToHsl4x(rgbValues);
};

// [1440, 400, 400] -> '255, 255, 255'
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const hsl4xToRgb = hslValues4x => {
  let [H, S, L] = hslValues4x.map(v => parseInt(v) / HSL_SCALE);

  const sat = S / 100;
  const lum = L / 100;
  const hue = H / 360;

  // no sat, so no hue, we have a shade of gray
  if (sat === 0) {
    const v = Math.round(255 * lum);
    return [v, v, v];
  }

  // intermediate calculations
  const x = lum < 0.5 ? lum * (1 + sat) : lum + sat - lum * sat;
  const y = 2 * lum - x;
  const protoRBG = [hue + 1 / 3, hue, hue - 1 / 3].map(v => {
    if (v < 0) return v + 1;
    if (v > 1) return v - 1;
    return v;
  });

  const calcValue = val => {
    if (6 * val < 1) return y + (x - y) * 6 * val;
    if (2 * val < 1) return x;
    if (3 * val < 2) return y + (x - y) * (2 / 3 - val) * 6;
    return y;
  };
  // beware modulo and off-by-1s! 256 here, not 255
  return protoRBG.map(calcValue).map(v => trueMod(Math.round(255 * v), 256));
};

const hslToRgb = hslValues => {
  return hsl4xToRgb(hslValues.map(v => v * 4));
};

// [360, 100, 100] -> 'ffffff'
const hslToHex = hslValues => {
  const rgbValues = hslToRgb(hslValues.map(v => parseInt(v)));
  return rgbToHex(rgbValues);
};

// [1440, 400, 400] -> 'ffffff'
const hsl4xToHex = hslValues4x => {
  const rgbValues = hsl4xToRgb(hslValues4x);
  return rgbToHex(rgbValues);
};

const hslValuesToCSS = hslValues => {
  const [H, S, L] = hslValues;
  return `hsl(${H}, ${S}%, ${L}%)`;
};

const hslValues4xToCSS = hslValues4x => {
  const [H, S, L] = hslValues4x;
  return `hsl(${H / 4}, ${S / 4}%, ${L / 4}%)`;
};

const rgbValuesToCSS = rgbValues => {
  const [R, G, B] = rgbValues;
  return `rgb(${R}, ${G}, ${B})`;
};

const hexValuesToCSS = hexValue => {
  return `#${hexValue}`;
};

export default {
  hsl4x: {
    toRgb: hsl4xToRgb,
    toHex: hsl4xToHex,
    toCSS: hslValues4xToCSS
  },
  hsl: {
    toRgb: hslToRgb,
    toHex: hslToHex,
    toCSS: hslValuesToCSS
  },
  rgb: {
    toHsl: rgbToHsl,
    toHsl4x: rgbToHsl4x,
    toHex: rgbToHex,
    toCSS: rgbValuesToCSS
  },
  hex: {
    toHsl: hexToHsl,
    toHsl4x: hexToHsl4x,
    toRgb: hexToRgb,
    toCSS: hexValuesToCSS,
    normalize: hex => splitHex(hex).join('')
  }
};
