import { hectoMatch, degreeMatch, byteMatch, hexColorMatch } from './regexDefs';

export const validHsl = (h, s, l) =>
  degreeMatch.test(h) && hectoMatch.test(s) && hectoMatch.test(l);

export const validRgb = (r, g, b) => byteMatch.test(r) && byteMatch.test(g) && byteMatch.test(b);

export const validHex = hex => hexColorMatch.test(hex);

export const random8Bit = () => Math.floor(Math.random() * 256);

export const randomRgbValues = () => [random8Bit(), random8Bit(), random8Bit()];

export const trueMod = (n, m) => ((n % m) + m) % m;

export const ensureIsNotInput = event => {
  return event.target.tagName.toLowerCase() !== 'input';
};

export const fireHotKey = (e, callback) => {
  if (ensureIsNotInput(e)) {
    e.preventDefault();
    callback();
  }
};
