const version = '2019.8.10';

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
  localStorageKeys: {
    color: `color-joeb-dev-color-${version}`,
    theme: `color-joeb-dev-theme-${version}`,
    preferences: `color-joeb-dev-prefs-${version}`
  },
  GAPropertyId: 'UA-140727716-1',
  initPreferences,
  env: process.env.NODE_ENV,
  transitionDurationMs: 400,
  hslScaleFactor: 4,
  harmonyConstants
};
