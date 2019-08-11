import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import config from 'config';

export const random8Bit = () => Math.floor(Math.random() * 256);

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

export const initializeSentry = () => {
  if (config.env === 'production') {
    Sentry.init({ dsn: config.sentryDsn });
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

export const getOrNull = (obj, key) => (key in obj ? obj[key] : null);

export const getOrCreate = (obj, key, defaultValue) => {
  if (key in obj) return obj[key];

  obj[key] = defaultValue;
  return defaultValue;
};
