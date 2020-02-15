import { hectoMatch, degreeMatch, byteMatch, hexColorMatch } from './regexDefs';
import { random8Bit } from 'helpers';

export const validHsl = (h, s, l) =>
  degreeMatch.test(h) && hectoMatch.test(s) && hectoMatch.test(l);

export const validRgb = (r, g, b) =>
  byteMatch.test(r) && byteMatch.test(g) && byteMatch.test(b);

export const validHex = hex => hexColorMatch.test(hex);

export const randomRgbValues = () => [random8Bit(), random8Bit(), random8Bit()];

// https://www.w3.org/TR/AERT#color-contrast
export const perceivedBrightness = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000;

export const isBrighterThan = (r, g, b, x) => perceivedBrightness(r, g, b) > x;

// 123 is arbitrary but apparently works well
export const isBright = (r, g, b) => isBrighterThan(r, g, b, 123);

export const hslTo4x = hslValues => hslValues.map(v => v * 4);
