export default {
  localStorageStrings: {
    color: 'color-joeb-dev-color-state',
    theme: 'color-joeb-dev-theme-state'
  },
  publicURL: 'https://color.joelb.dev',
  pageTitle: 'Web color tool for developers | Convert RGB/HSL/Hex & explore harmonies',
  GAPropertyId: 'UA-140727716-1',
  env: process.env.NODE_ENV,
  transitionDurationMs: 400,
  hslScaleFactor: 4,
  harmonyConstants: {
    CO: 'Complementary',
    MO: 'Monochromatic',
    AN: 'Analogous',
    SP: 'Split Complementary',
    TR: 'Triadic',
    TE: 'Tetradic'
  }
};
