const colors = {
  offWhite: '#efefef',
  offBlack: '#111111',
  lightGrey: '#cccccc',
  darkGrey: '#333333'
};

const common = {
  font: `'Source Sans Pro', sans-serif;`,
  fontFixed: `'Source Code Pro', monospace;`,
  highlightColor: 'hsl(168, 81%, 56%)'
};

const dark = {
  backgroundColor: colors.offBlack,
  textColor: colors.offWhite,
  previewOverlayColor: 'rgba(255, 255, 255, 0.5)',
  buttonHighlightColor: 'rgba(255, 255, 255, 0.1)',
  fullScreenModalBgColor: 'rgba(255,255,255, 0.9)',
  inputColor: colors.darkGrey,
  menu: {
    bgColor: colors.offWhite,
    textColor: colors.offBlack,
    buttonHoverColor: 'rgba(0, 0, 0, 0.1)'
  },
  colors: {
    ...colors
  },
  ...common
};

const light = {
  backgroundColor: colors.offWhite,
  textColor: colors.offBlack,
  previewOverlayColor: 'rgba(0, 0, 0, 0.5)',
  buttonHighlightColor: 'rgba(0, 0, 0, 0.1)',
  fullScreenModalBgColor: 'rgba(0, 0, 0, 0.85)',
  inputColor: colors.lightGrey,
  menu: {
    bgColor: colors.offBlack,
    textColor: colors.offWhite,
    buttonHoverColor: 'rgba(255, 255, 255, 0.1)'
  },
  colors: {
    ...colors
  },
  ...common
};

export { light, dark };
