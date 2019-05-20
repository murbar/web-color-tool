import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Preview from './components/Preview';
import Input from './components/Input';
import convert from './convert';

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
      <h2>Hexadecimal</h2>
      <Input type="text" placeholder="000000" value={value} onChange={onChange} maxLength="6" />
      {!inputValid && <p>Invalid hex</p>}
    </>
  );
};

function App() {
  const [colorValues, setColorValues] = useState({
    hex: '000000',
    hsl: {
      H: 0,
      S: 0,
      L: 0
    },
    rgb: {
      R: 0,
      G: 0,
      B: 0
    }
  });

  useEffect(() => {
    const rgbString = `${colorValues.rgb.R}, ${colorValues.rgb.G}, ${colorValues.rgb.B}`;
    const hslString = convert.rgb.toHsl(rgbString);
    const [H, S, L] = convert.hsl.stringToValues(hslString);
    const hex = convert.rgb.toHex(rgbString);
    setColorValues(prev => ({ ...prev, hex, hsl: { H, S, L } }));
  }, [colorValues.rgb]);

  const setHex = value => {
    const [R, G, B] = convert.hex.toRgb(value).split(', ');
    setColorValues(prev => ({ ...prev, rgb: { R, G, B } }));
  };

  return (
    <Styles>
      <h1>Color tool</h1>
      <Preview rgb={colorValues.rgb} />
      <HexInputs handleChange={setHex} colorValues={colorValues} />
    </Styles>
  );
}

export default App;
