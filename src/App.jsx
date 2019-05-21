import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Preview from './components/Preview';
import Input from './components/Input';
import colorConvert from './colorConvert';

const Styles = styled.div``;

const HexInputs = ({ handleChange, colorValues }) => {
  // validate 3 or 6 chars, all 0-F
  const [inputValid, setInputValid] = useState(true);
  const [value, setValue] = useState('000000');

  useEffect(() => {
    setValue(colorValues.hex);
  }, [colorValues]);

  const re = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;

  const onChange = e => {
    const v = e.target.value.replace(/#/, '');
    setValue(v);
    setInputValid(true);
    const validValue = re.test(v);
    if (!validValue) {
      setInputValid(false);
    } else {
      handleChange(v);
    }
  };
  return (
    <>
      Hex <Input type="text" placeholder="000000" value={value} onChange={onChange} maxLength="6" />
      {!inputValid && <p>Invalid hex</p>}
    </>
  );
};

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

  // useEffect(() => {
  //   setColorValues(calcValues([R, G, B]));
  // }, [colorValues.rgb]);

  const setHex = hexValue => {
    const rgbValues = colorConvert.hex.toRgb(hexValue);
    setColor(rgbValues);
  };

  return (
    <Styles>
      <h1>Color Multi-tool</h1>
      <button onClick={randomizeColor}>Randomize</button>
      <Preview colorValues={colorValues} />
      <h2>Inputs</h2>
      <HexInputs handleChange={setHex} colorValues={colorValues} />
    </Styles>
  );
}

export default App;
