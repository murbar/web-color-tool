import React, { useState, useEffect } from 'react';
import colorConvert from '../colorConvert';
import DegreeInput from './common/DegreeInput';
import HectoInput from './common/HectoInput';

const HslForm = ({ setColor, colorValues }) => {
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    const [h, s, l] = colorValues.hsl;
    setHslValues({ h, s, l });
  }, [colorValues.hsl]);

  const handleChange = (e, value, name) => {
    setHslValues(prev => {
      const newValues = { ...prev, [name]: value };
      const { h, s, l } = newValues;
      const rgbValues = colorConvert.hsl.toRgb([h, s, l]);
      setColor(rgbValues);
      return newValues;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div>
      <label>HSL</label>
      <DegreeInput name="h" value={hslValues.h} onFocus={handleFocus} onChange={handleChange} />
      <HectoInput name="s" value={hslValues.s} onFocus={handleFocus} onChange={handleChange} />
      <HectoInput name="l" value={hslValues.l} onFocus={handleFocus} onChange={handleChange} />
    </div>
  );
};

export default HslForm;
