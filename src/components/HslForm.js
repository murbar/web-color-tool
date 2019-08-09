import React, { useState, useEffect } from 'react';
import colorConvert from 'colorConvert';
import DegreeInput from 'components/common/DegreeInput';
import HectoInput from 'components/common/HectoInput';
import { recordGAEvent } from 'helpers';

const HslForm = ({ setColor, colorValues }) => {
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    const [h, s, l] = colorValues.hsl;
    setHslValues({ h, s, l });
  }, [colorValues.hsl]);

  const handleChange = (e, value, name) => {
    setHslValues(prev => {
      const newValues = { ...prev, [name]: value };
      let { h, s, l } = newValues;
      if (prev.h === 0 && h > 0 && prev.s === 0) s = 50;
      const rgbValues = colorConvert.hsl.toRgb([h, s, l]);
      setColor(rgbValues);
      return newValues;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div onClick={() => recordGAEvent('User', 'Clicked', 'HSL inputs')}>
      <label>HSL</label>
      <DegreeInput
        name="h"
        value={hslValues.h}
        onFocus={handleFocus}
        onChange={handleChange}
        aria-label="HSL hue"
      />
      <HectoInput
        name="s"
        value={hslValues.s}
        onFocus={handleFocus}
        onChange={handleChange}
        aria-label="HSL saturation"
      />
      <HectoInput
        name="l"
        value={hslValues.l}
        onFocus={handleFocus}
        onChange={handleChange}
        aria-label="HSL luminance"
      />
    </div>
  );
};

export default HslForm;
