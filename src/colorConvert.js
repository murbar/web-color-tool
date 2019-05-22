// 'FFF'/'FFFFFF' -> ['FF', 'FF', 'FF']
const splitHex = hexValue => {
  const length = hexValue.length;

  if (length === 3) return [...hexValue].map(v => v + v);
  if (length === 6) return [hexValue.slice(0, 2), hexValue.slice(2, 4), hexValue.slice(4, 6)];

  throw new Error('Invalid hex value: ', hexValue);
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

// [255, 255, 255] -> [0, 0, 100]
// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
// https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const rgbToHsl = rgbValues => {
  // convert to value between 0 and 1
  const rgb = rgbValues.map(n => parseInt(n) / 255);
  const [min, max] = [Math.min(...rgb), Math.max(...rgb)];
  const L = (min + max) / 2;
  const lum = Math.round(L * 100);

  // no sat, so no hue, we have a shade of gray
  if (max === min) return [0, 0, lum];

  const chroma = max - min;
  const S = chroma / (1 - Math.abs(2 * L - 1));
  const sat = Math.round(S * 100);

  const [R, G, B] = rgb;
  const hueMaxChannel = {
    '0': (G - B) / chroma + (G < B ? 6 : 0),
    '1': (B - R) / chroma + 2,
    '2': (R - G) / chroma + 4
  };
  const H = hueMaxChannel[rgb.indexOf(max)];
  const hue = Math.round(H * 60);

  return [hue, sat, lum];
};

// 'FFF'/'FFFFFF' -> [255, 255, 255]
const hexToRgb = hexValue => {
  return splitHex(hexValue).map(h => parseInt(h, 16));
};

// 'FFF'/'FFFFFF' -> [0, 0, 100]
const hexToHsl = hexValue => {
  const rgbValues = hexToRgb(hexValue);
  return rgbToHsl(rgbValues);
};

// const hslStringToValues = hslString => {
//   const re = /(\d+),\s*([\d.]+)%,\s*([\d.]+)%/g;
//   const [, H, S, L] = re.exec(hslString);
//   return [H, S, L];
// };

// '0, 0%, 100%' -> '255, 255, 255'
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const hslToRgb = hslValues => {
  let [H, S, L] = hslValues;

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

  return protoRBG.map(calcValue).map(v => Math.round(v * 255));
};

// [0, 0, 100] -> 'ffffff'
const hslToHex = hslValues => {
  const rgbValues = hslToRgb(hslValues);
  return rgbToHex(rgbValues);
};

const hslValuesToCSS = hslValues => {
  const [H, S, L] = hslValues;
  return `hsl(${H}, ${S}%, ${L}%)`;
};

const rgbValuesToCSS = rgbValues => {
  const [R, G, B] = rgbValues;
  return `rgb(${R}, ${G}, ${B})`;
};

const hexValuesToCSS = hexValue => {
  return `#${hexValue}`;
};

export default {
  rgb: {
    toHex: rgbToHex,
    toHsl: rgbToHsl,
    toCSS: rgbValuesToCSS
  },
  hsl: {
    toRgb: hslToRgb,
    toHex: hslToHex,
    toCSS: hslValuesToCSS
  },
  hex: {
    toRgb: hexToRgb,
    toHsl: hexToHsl,
    toCSS: hexValuesToCSS
  }
};
