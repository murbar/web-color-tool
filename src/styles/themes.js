const colors = {
  offWhite: '#efefef',
  offBlack: '#111111',
  lightGrey: '#cccccc',
  darkGrey: '#333333'
};

const common = {
  font: `'Source Sans Pro', sans-serif;`,
  fontFixed: `'Source Code Pro', monospace;`,
  preview: {
    darkOverlayBg: 'rgba(0, 0, 0, 0.2)',
    brightOverlayBg: 'rgba(255, 255, 255, 0.2)'
  }
};

const dark = {
  backgroundColor: colors.offBlack,
  textColor: colors.offWhite,
  buttonHoverColor: 'rgba(255, 255, 255, 0.15)',
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
  buttonHoverColor: 'rgba(0,0,0, 0.15)',
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
