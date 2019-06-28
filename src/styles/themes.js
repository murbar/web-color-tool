const common = {
  font: `'Source Sans Pro', sans-serif;`,
  fontFixed: `'Source Code Pro', monospace;`,
  highlightColor: 'hsl(168, 81%, 56%)'
};

const dark = {
  backgroundColor: '#111111',
  textColor: '#efefef',
  overlayColor: 'rgba(255, 255, 255, 0.5)',
  buttonHighlightColor: 'rgba(255, 255, 255, 0.1)',
  inputColor: '#333333',
  ...common
};

const light = {
  backgroundColor: '#efefef',
  textColor: '#111111',
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  buttonHighlightColor: 'rgba(0, 0, 0, 0.1)',
  inputColor: '#CCCCCC',
  ...common
};

export { light, dark };
