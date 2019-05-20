// 'FFF'/'FFFFFF' -> ['FF', 'FF', 'FF']
const splitHex = hexString => {
  if (hexString.length === 3) return [...hexString].map(v => v + v);

  return [hexString.slice(0, 2), hexString.slice(2, 4), hexString.slice(4, 6)];
};

// '255, 255, 255' -> 'FFFFFF'
const rgbToHex = rgbString => {
  return rgbString
    .split(',')
    .map(n => parseInt(n).toString(16))
    .join('')
    .toUpperCase();
};

// '255, 255, 255' -> '0, 0%, 100%'
// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
// https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const rgbToHsl = rgbString => {
  // convert to value between 0 and 1
  const rgb = rgbString.split(',').map(n => parseInt(n) / 255);
  const [min, max] = [Math.min(...rgb), Math.max(...rgb)];
  const L = (min + max) / 2;
  const lum = Math.round(L * 100);

  // no sat, so no hue, we have a shade of gray
  if (max === min) return `0, 0%, ${lum}%`;

  const chroma = max - min;
  const S = chroma / (1 - Math.abs(2 * L - 1));
  const sat = Math.round(S * 100);

  const [R, G, B] = rgb;
  const hueMaxChannel = {
    '0': ((G - B) / chroma) % 6,
    '1': (B - R) / chroma + 2,
    '2': (R - G) / chroma + 4
  };
  const H = hueMaxChannel[rgb.indexOf(max)];
  const hue = Math.round(H * 60);

  return `${hue}, ${sat}%, ${lum}%`;
};

// 'FFF'/'FFFFFF' -> '255, 255, 255'
const hexToRgb = hexString => {
  return splitHex(hexString)
    .map(n => parseInt(n, 16))
    .join(', ');
};

// 'FFF'/'FFFFFF' -> '0, 0%, 100%'
const hexToHsl = hexString => {
  const rgb = hexToRgb(hexString);
  return rgbToHsl(rgb);
};

const hslStringToValues = hslString => {
  const re = /(\d+),\s*([\d.]+)%,\s*([\d.]+)%/g;
  const [, H, S, L] = re.exec(hslString);
  return [H, S, L];
};

// '0, 0%, 100%' -> '255, 255, 255'
// https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
const hslToRgb = hslString => {
  let [H, S, L] = hslStringToValues(hslString);

  const sat = S / 100;
  const lum = L / 100;
  const hue = H / 360;

  // no sat, so no hue, we have a shade of gray
  if (sat === 0) {
    const v = 255 * lum;
    return `${v}, ${v}, ${v}`;
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

  return protoRBG
    .map(calcValue)
    .map(v => Math.round(v * 255))
    .join(', ');
};

// '0, 0%, 100%' -> 'ffffff'
const hslToHex = hslString => {
  const rgb = hslToRgb(hslString);
  return rgbToHex(rgb);
};

export default {
  rgb: {
    toHex: rgbToHex,
    toHsl: rgbToHsl
  },
  hsl: {
    toRgb: hslToRgb,
    toHex: hslToHex,
    stringToValues: hslStringToValues
  },
  hex: {
    toRgb: hexToRgb,
    toHsl: hexToHsl
  }
};
