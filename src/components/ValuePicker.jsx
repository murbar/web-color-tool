import React, { useState } from 'react';
import styled from 'styled-components';
import ColorInputRange from 'components/common/ColorInputRange';
import colorConvert from 'colorConvert';

const StyledDiv = styled.div``;

const Value = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  label {
    font-family: 'Source Code Pro', monospace;
    margin-right: 1rem;
    text-transform: uppercase;
  }
  > div {
    flex-grow: 1;
  }
`;

const SatScale = styled(ColorInputRange)`
  .input-range__track--background {
    background: linear-gradient(
      to right,
      hsl(${p => p.hue}, 0%, 50%),
      hsl(${p => p.hue}, 100%, 50%)
    );
  }
  .input-range__slider {
    background: ${p => `hsl(${p.hue}, ${p.value}%, 50%)`};
  }
`;

const LumScale = styled(ColorInputRange)`
  .input-range__track--background {
    background: linear-gradient(
      to right,
      hsl(${p => p.hue}, 100%, 0%),
      hsl(${p => p.hue}, 100%, 50%),
      hsl(${p => p.hue}, 100%, 100%)
    );
  }
  .input-range__slider {
    background: ${p => `hsl(${p.hue}, 100%, ${p.value}%)`};
  }
`;

const HueScale = styled(ColorInputRange)`
  .input-range__track--background {
    background: linear-gradient(
      to right,
      hsl(0, 100%, 50%),
      hsl(15, 100%, 50%),
      hsl(30, 100%, 50%),
      hsl(45, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(75, 100%, 50%),
      hsl(90, 100%, 50%),
      hsl(105, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(135, 100%, 50%),
      hsl(150, 100%, 50%),
      hsl(165, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(195, 100%, 50%),
      hsl(210, 100%, 50%),
      hsl(225, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(255, 100%, 50%),
      hsl(270, 100%, 50%),
      hsl(285, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(315, 100%, 50%),
      hsl(330, 100%, 50%),
      hsl(345, 100%, 50%),
      hsl(360, 100%, 50%)
    );
  }
  .input-range__slider {
    background: ${p => `hsl(${p.value}, 100%, 50%)`};
  }
`;

const ValuePicker = ({ setColor, colorValues }) => {
  const [h, s, l] = colorValues.hsl;
  const [values, setValues] = useState({ h, s, l });

  React.useEffect(() => {
    const [h, s, l] = colorValues.hsl;
    setValues({ h, s, l });
  }, [colorValues]);

  const set = ({ h, s, l }) => {
    setColor(colorConvert.hsl.toRgb([h, s, l]));
  };

  const handleSetHue = h => {
    setValues(prev => {
      const values = { ...prev, h };
      if (s === 0) values.s = 50;
      if (l === 0) values.l = 50;
      set(values);
      return values;
    });
  };

  const handleSetSat = s => {
    setValues(prev => {
      const values = { ...prev, s };
      if (l === 0) values.l = 50;
      set(values);
      return values;
    });
  };

  const handleSetLum = l => {
    setValues(prev => {
      const values = { ...prev, l };
      set(values);
      return values;
    });
  };

  return (
    <StyledDiv>
      <Value>
        <label>Sat</label>
        <SatScale hue={values.h} maxValue={100} value={values.s} onChange={handleSetSat} />
      </Value>
      <Value>
        <label>Lum</label>
        <LumScale hue={values.h} maxValue={100} value={values.l} onChange={handleSetLum} />
      </Value>
      <Value>
        <label>Hue</label>
        <HueScale maxValue={360} value={values.h} onChange={handleSetHue} />
      </Value>
    </StyledDiv>
  );
};

export default ValuePicker;
