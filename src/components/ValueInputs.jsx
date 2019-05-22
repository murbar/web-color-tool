import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import Input from './common/Input';
import ByteInput from './common/ByteInput';
import colorConvert from '../colorConvert';

const RgbInputs = ({ setColor, colorValues }) => {
  // TODO input valid state for invalid input indicator
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    const [r, g, b] = colorValues.rgb;
    setRgbValues({ r, g, b });
  }, [colorValues.rgb]);

  const onChange = (e, value, name) => {
    setRgbValues(prev => {
      const newValues = { ...prev, [name]: value };
      const { r, g, b } = newValues;
      setColor([r, g, b]);
      return newValues;
    });
  };

  return (
    <div>
      <label>R</label>
      <ByteInput name="r" value={rgbValues.r} onChange={onChange} />
      <label>G</label>
      <ByteInput name="g" value={rgbValues.g} onChange={onChange} />
      <label>B</label>
      <ByteInput name="b" value={rgbValues.b} onChange={onChange} />
    </div>
  );
};

const HslInputs = ({ setColor, colorValues }) => {
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, s: 0 });

  useEffect(() => {
    const [h, s, l] = colorValues.hsl;
    setHslValues({ h, s, l });
  }, [colorValues.hsl]);

  const onChange = (e, value, name) => {
    setHslValues(prev => {
      const newValues = { ...prev, [name]: value };
      const rgbValues = colorConvert.hsl.toRgb(newValues);
      setColor(rgbValues);
      return newValues;
    });
  };

  return (
    <div>
      <label>H</label>
      <ByteInput name="h" value={hslValues.h} onChange={onChange} />
      <label>S</label>
      <ByteInput name="s" value={hslValues.s} onChange={onChange} />
      <label>L</label>
      <ByteInput name="l" value={hslValues.l} onChange={onChange} />
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
      <HslInputs setColor={setColor} colorValues={colorValues} />
    </div>
  );
}
