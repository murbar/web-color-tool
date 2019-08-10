import React, { useState, useEffect } from 'react';
import colorConvert from 'colorConvert';
import HexInput from 'components/common/HexInput';
import { recordGAEvent } from 'helpers';

const HexField = ({ setColor, colorValues }) => {
  const [hexValue, setHexValue] = useState('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setHexValue(colorValues.hex);
  }, [colorValues.hex]);

  const handleChange = (e, value) => {
    setHexValue(() => {
      if (value.length === 6) {
        setInputError(false);
        setColor(colorConvert.hex.toHsl4x(value));
      } else {
        setInputError(true);
      }
      return value;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div onClick={() => recordGAEvent('User', 'Clicked', 'Hex inputs')}>
      <label>HEX</label>
      <HexInput
        name="hex"
        value={hexValue}
        onChange={handleChange}
        onFocus={handleFocus}
        error={inputError}
        aria-label="Hexadecimal"
      />
    </div>
  );
};

export default HexField;
