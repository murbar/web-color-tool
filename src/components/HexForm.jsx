import React, { useState, useEffect } from 'react';
import colorConvert from 'colorConvert';
import HexInput from 'components/common/HexInput';

const HexForm = ({ setColor, colorValues }) => {
  const [hexValue, setHexValue] = useState('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setHexValue(colorValues.hex);
  }, [colorValues.hex]);

  const handleChange = (e, value, name) => {
    setHexValue(() => {
      if (value.length === 6) {
        setInputError(false);
        const rgbValues = colorConvert.hex.toRgb(value);
        setColor(rgbValues);
      } else {
        setInputError(true);
      }
      return value;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div>
      <label>HEX</label>
      <HexInput
        name="hex"
        value={hexValue}
        onChange={handleChange}
        onFocus={handleFocus}
        error={inputError}
      />
    </div>
  );
};

export default HexForm;
