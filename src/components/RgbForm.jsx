import React, { useState, useEffect } from 'react';
import ByteInput from 'components/common/ByteInput';

const RgbForm = ({ setColor, colorValues }) => {
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
      setColor([r, g, b]);
      return newValues;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div>
      <label>RGB</label>
      <ByteInput name="r" value={rgbValues.r} onFocus={handleFocus} onChange={handleChange} />
      <ByteInput name="g" value={rgbValues.g} onFocus={handleFocus} onChange={handleChange} />
      <ByteInput name="b" value={rgbValues.b} onFocus={handleFocus} onChange={handleChange} />
    </div>
  );
};

export default RgbForm;
