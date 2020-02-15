const version = '2020.2.15';

const localStorageKeys = {
  colors: `color-joeb-dev-colors-${version}`,
  baseColor: `color-joeb-dev-base-${version}`,
  theme: `color-joeb-dev-theme-${version}`,
  preferences: `color-joeb-dev-prefs-${version}`
};

const initPreferences = {
  darkTheme: true
};

const harmonyConstants = {
  CO: 'Complementary',
  MO: 'Monochromatic',
  AN: 'Analogous',
  SP: 'Split Complementary',
  TR: 'Triadic',
  TE: 'Tetradic'
};

export default {
  version,
  publicURL: 'https://color.joelb.dev',
  pageTitle: 'Web color tool for developers | Convert RGB/HSL/Hex & explore harmonies',
  localStorageKeys,
  GAPropertyId: 'UA-140727716-1',
  sentryDsn: 'https://4ce61244b73c47a2806e2f9cefeaf925@sentry.io/1527263',
  initPreferences,
  env: process.env.NODE_ENV,
  transitionDurationMs: 400,
  hslScaleFactor: 4,
  harmonyConstants
};
