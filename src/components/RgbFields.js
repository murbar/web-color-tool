import React, { useState, useEffect } from 'react';
import ByteInput from 'components/common/ByteInput';
import ContiguousInputs from 'components/common/ContiguousInputs';
import { recordGAEvent } from 'helpers';
import colorConvert from 'colorConvert';

const RgbFields = ({ setColor, colorValues }) => {
  // TODO input valid state for invalid input indicator
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    const [r, g, b] = colorValues.rgb;
    setRgbValues({ r, g, b });
  }, [colorValues.rgb]);

  const handleChange = (e, value, name) => {
    setRgbValues(prev => {
      const newValues = { ...prev, [name]: value };
      const { r, g, b } = newValues;
      setColor(colorConvert.rgb.toHsl4x([r, g, b]));
      return newValues;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div onClick={() => recordGAEvent('User', 'Clicked', 'RGB inputs')}>
      <label>RGB</label>
      <ContiguousInputs>
        <ByteInput
          name="r"
          value={rgbValues.r}
          onFocus={handleFocus}
          onChange={handleChange}
          aria-label="RGB red"
        />
        <ByteInput
          name="g"
          value={rgbValues.g}
          onFocus={handleFocus}
          onChange={handleChange}
          aria-label="RGB green"
        />
        <ByteInput
          name="b"
          value={rgbValues.b}
          onFocus={handleFocus}
          onChange={handleChange}
          aria-label="RGB blue"
        />
      </ContiguousInputs>
    </div>
  );
};

export default RgbFields;
