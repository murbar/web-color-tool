import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Input';
import colorConvert from '../colorConvert';

const HexInputs = ({ setColor, colorValues }) => {
  // validate 3 or 6 chars, all 0-F
  const [inputValid, setInputValid] = useState(true);
  const [value, setValue] = useState(colorValues.hex);

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
      setColor(v);
    }
  };
  return (
    <>
      Hex <Input type="text" placeholder="000000" value={value} onChange={onChange} maxLength="6" />
      {!inputValid && <p>Invalid hex</p>}
    </>
  );
};

export default function Inputs({ setColor, colorValues }) {
  return (
    <div>
      <HexInputs setColor={setColor} colorValues={colorValues} />
    </div>
  );
}
