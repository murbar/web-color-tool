import React, { useState, useEffect } from 'react';
import ContiguousInputs from 'components/common/ContiguousInputs';
import DegreeInput from 'components/common/DegreeInput';
import HectoInput from 'components/common/HectoInput';
import { recordGAEvent } from 'helpers';
import { hslTo4x } from 'colorUtils';

const HslFields = ({ setColor, baseColor }) => {
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    const [h, s, l] = baseColor.hsl;
    setHslValues({ h, s, l });
  }, [baseColor.hsl]);

  const handleChange = (e, value, name) => {
    setHslValues(prev => {
      const newValues = { ...prev, [name]: value };
      let { h, s, l } = newValues;
      setColor(hslTo4x([h, s, l]));
      return newValues;
    });
  };

  const handleFocus = e => e.target.select();

  return (
    <div onClick={() => recordGAEvent('User', 'Clicked', 'HSL inputs')}>
      <label>HSL</label>
      <ContiguousInputs>
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
      </ContiguousInputs>
    </div>
  );
};

export default HslFields;
