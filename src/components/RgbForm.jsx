import React, { useState, useEffect } from 'react';
import ByteInput from './common/ByteInput';

const RgbForm = ({ setColor, colorValues }) => {
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
      <label>RGB</label>
      <ByteInput name="r" value={rgbValues.r} onChange={onChange} />
      <ByteInput name="g" value={rgbValues.g} onChange={onChange} />
      <ByteInput name="b" value={rgbValues.b} onChange={onChange} />
    </div>
  );
};

export default RgbForm;
