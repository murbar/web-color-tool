import { hectoMatch, degreeMatch, byteMatch, hexColorMatch } from './regexDefs';
import ReactGA from 'react-ga';
import config from 'config';

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

export const initializeGA = () => {
  if (config.env === 'production') {
    ReactGA.initialize(config.GAPropertyId);
  }
};

export const recordGAEvent = (category, action, label) => {
  if (!category || !action) {
    console.warn('GA Event: Category and action are required - aborting');
  } else if (config.env === 'production') {
    const payload = {
      category,
      action
    };
    if (label) payload.label = label;
    ReactGA.event(payload);
  }
};

// https://www.w3.org/TR/AERT#color-contrast
export const perceivedBrightness = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000;

export const isBrighterThan = (r, g, b, x) => perceivedBrightness(r, g, b) > x;

// 123 is arbitrary but works well
export const isBright = (r, g, b) => isBrighterThan(r, g, b, 123);

export const hslTo4x = hslValues => hslValues.map(v => v * 4);
