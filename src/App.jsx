import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Preview from './components/Preview';
import colorConvert from './colorConvert';
import Inputs from './components/Inputs';
import Button from './components/Button';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

const AppWrapper = styled.div``;

const Randomizer = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const deriveColorState = rgbValues => {
  return {
    rgb: rgbValues,
    hsl: colorConvert.rgb.toHsl(rgbValues),
    hex: colorConvert.rgb.toHex(rgbValues)
  };
};

const random8Bit = () => Math.floor(Math.random() * 256);

const randomColorValues = () => deriveColorState([random8Bit(), random8Bit(), random8Bit()]);

function App() {
  const [colorValues, setColorValues] = useState(randomColorValues());

  const setColor = rgbValues => {
    setColorValues(deriveColorState(rgbValues));
  };

  const randomizeColor = () => {
    setColorValues(randomColorValues());
  };

  return (
    <Router>
      <AppWrapper>
        <h1>Color Multi-tool</h1>
        <Randomizer onClick={randomizeColor}>Randomize</Randomizer>
        <Preview colorValues={colorValues} />
        <h2>Inputs</h2>
        <Inputs setColor={setColor} colorValues={colorValues} />
      </AppWrapper>
    </Router>
  );
}

export default App;
