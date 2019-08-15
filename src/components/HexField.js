import React, { useState, useEffect } from 'react';
import colorConverter from 'colorConverter';
import HexInput from 'components/common/HexInput';
import { recordGAEvent } from 'helpers';

const HexField = ({ setColor, baseColor }) => {
  const [hexValue, setHexValue] = useState('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setHexValue(baseColor.hex);
  }, [baseColor.hex]);

  const handleChange = (e, value) => {
    setHexValue(() => {
      if (value.length === 6) {
        setInputError(false);
        setColor(colorConverter.hex.toHsl4x(value));
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
