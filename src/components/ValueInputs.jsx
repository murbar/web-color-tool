import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import ByteInput from './common/ByteInput';
import colorConvert from '../colorConvert';
import DegreeInput from './common/DegreeInput';
import HectoInput from './common/HectoInput';
import HexInput from './common/HexInput';

const RgbInputs = ({ setColor, colorValues }) => {
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
      <label>R</label>
      <ByteInput name="r" value={rgbValues.r} onChange={onChange} />
      <label>G</label>
      <ByteInput name="g" value={rgbValues.g} onChange={onChange} />
      <label>B</label>
      <ByteInput name="b" value={rgbValues.b} onChange={onChange} />
    </div>
  );
};

const HslInputs = ({ setColor, colorValues }) => {
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    const [h, s, l] = colorValues.hsl;
    setHslValues({ h, s, l });
  }, [colorValues.hsl]);

  const onChange = (e, value, name) => {
    setHslValues(prev => {
      const newValues = { ...prev, [name]: value };
      const { h, s, l } = newValues;
      const rgbValues = colorConvert.hsl.toRgb([h, s, l]);
      setColor(rgbValues);
      return newValues;
    });
  };

  return (
    <div>
      <label>H</label>
      <DegreeInput name="h" value={hslValues.h} onChange={onChange} />
      <label>S</label>
      <HectoInput name="s" value={hslValues.s} onChange={onChange} />
      <label>L</label>
      <HectoInput name="l" value={hslValues.l} onChange={onChange} />
    </div>
  );
};

const HexForm = ({ setColor, colorValues }) => {
  const [hexValue, setHexValue] = useState('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setHexValue(colorValues.hex);
  }, [colorValues.hex]);

  const onChange = (e, value, name) => {
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

  return (
    <div>
      <label>HEX</label>
      <HexInput name="hex" value={hexValue} onChange={onChange} error={inputError} />
    </div>
  );
};

const Inputs = ({ setColor, colorValues }) => {
  return (
    <div>
      <HexForm setColor={setColor} colorValues={colorValues} />
      <RgbInputs setColor={setColor} colorValues={colorValues} />
      <HslInputs setColor={setColor} colorValues={colorValues} />
    </div>
  );
};

export default Inputs;
