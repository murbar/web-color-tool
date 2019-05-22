import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './common/Input';
import colorConvert from '../colorConvert';

const RgbInputs = ({ setColor, colorValues }) => {
  // TODO input valid state for invalid input indicator
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    const [r, g, b] = colorValues.rgb;
    setRgbValues({ r, g, b });
  }, [colorValues.rgb]);

  // useEffect(() => {
  //   console.log(rgbValues);
  // }, [rgbValues]);

  const byteRe = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/;

  const onChange = e => {
    const { value, name } = e.target;
    if (byteRe.test(value)) {
      setRgbValues(prev => {
        const newValues = { ...prev, [name]: parseInt(value) };
        const { r, g, b } = newValues;
        setColor([r, g, b]);
        return newValues;
      });
    } else if (value === '') {
      // TODO consolidate this with above function
      setRgbValues(prev => {
        const newValues = { ...prev, [name]: 0 };
        const { r, g, b } = newValues;
        setColor([r, g, b]);
        return newValues;
      });
    }
  };

  return (
    <div>
      <label>R</label>
      <Input
        type="text"
        placeholder="255"
        name="r"
        value={rgbValues.r}
        onChange={onChange}
        maxLength="3"
      />
      <label>G</label>
      <Input
        type="text"
        placeholder="255"
        name="g"
        value={rgbValues.g}
        onChange={onChange}
        maxLength="3"
      />
      <label>B</label>
      <Input
        type="text"
        placeholder="255"
        name="b"
        value={rgbValues.b}
        onChange={onChange}
        maxLength="3"
      />
    </div>
  );
};

const HexInputs = ({ setColor, colorValues }) => {
  // validate 3 or 6 chars, all 0-F
  const [inputValid, setInputValid] = useState(true);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(colorValues.hex);
  }, [colorValues.hex]);

  const re = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;

  const onChange = e => {
    const v = e.target.value.replace(/#/, '');
    console.log(e.persist());
    setInputValid(true);
    const validValue = re.test(v);
    if (!validValue) {
      // setInputValid(false);
    } else {
      setValue(prev => {
        // const rgbValues = colorConvert.hex.toRgb(value);
        // if (v.length === 6) setColor(rgbValues);
        return v;
      });
    }
  };

  const listenForEnterKey = e => {
    if (e.key === 'Enter') console.log('fire enter!');
  };

  return (
    <div>
      <label>HEX</label>
      <Input
        type="text"
        placeholder="FFFFFF"
        value={value}
        onChange={onChange}
        onKeyPress={listenForEnterKey}
        maxLength="6"
      />
      {!inputValid && <p>Invalid hex</p>}
    </div>
  );
};

export default function Inputs({ setColor, colorValues }) {
  return (
    <div>
      <HexInputs setColor={setColor} colorValues={colorValues} />
      <RgbInputs setColor={setColor} colorValues={colorValues} />
      {/* <HslInputs setColor={setColor} colorValues={colorValues} /> */}
    </div>
  );
}
