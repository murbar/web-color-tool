import React, { useState } from 'react';
import styled from 'styled-components';
import ColorInputRange from 'components/common/ColorInputRange';
import { recordGAEvent } from 'helpers';
import { useBaseColor } from 'contexts/baseColorContext';

const StyledDiv = styled.div`
  margin-top: 3.5rem;
`;

const SliderContainer = styled.div`
  margin-bottom: 0.5rem;
  label {
    font-weight: bold;
  }
`;

const SatScale = styled(ColorInputRange)`
  .input-range__track--background {
    background: linear-gradient(
      to right,
      hsl(${p => p.hsl.h}, 0%, 50%),
      hsl(${p => p.hsl.h}, 100%, 50%)
    );
  }
  .input-range__slider {
    background: ${p => `hsl(${p.hsl.h}, ${p.hsl.s}%, 50%)`};
  }
`;

const LumScale = styled(ColorInputRange)`
  .input-range__track--background {
    background: linear-gradient(
      to right,
      hsl(${p => p.hsl.h}, 100%, 0%),
      hsl(${p => p.hsl.h}, 100%, 50%),
      hsl(${p => p.hsl.h}, 100%, 100%)
    );
  }
  .input-range__slider {
    background: ${p => `hsl(${p.hsl.h}, 100%, ${p.hsl.l}%)`};
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
    background: ${p => `hsl(${p.hsl.h}, 100%, 50%)`};
  }
`;

const ValueSlider = () => {
  const { baseColor, setBaseHslPrecise } = useBaseColor();
  const [h4x, s4x, l4x] = baseColor.hsl4x;
  const [normalH, normalS, normalL] = baseColor.hslNormalized;
  const normalHsl = { h: normalH, s: normalS, l: normalL };
  const [values, setValues] = useState({ h: h4x, s: s4x, l: l4x });

  React.useEffect(() => {
    const [h, s, l] = baseColor.hsl4x;
    setValues({ h, s, l });
  }, [baseColor]);

  const set = ({ h, s, l }) => {
    setBaseHslPrecise([h, s, l]);
  };

  const handleSetHue = h => {
    setValues(prev => {
      const values = { ...prev, h };
      set(values);
      return values;
    });
  };

  const handleSetSat = s => {
    setValues(prev => {
      const values = { ...prev, s };
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
    <StyledDiv onClick={() => recordGAEvent('User', 'Clicked', 'Slider controls')}>
      <SliderContainer>
        <label>Hue</label>
        <HueScale maxValue={1440} value={values.h} hsl={normalHsl} onChange={handleSetHue} />
      </SliderContainer>
      <SliderContainer>
        <label>Saturation</label>
        <SatScale
          hue={values.h}
          maxValue={400}
          value={values.s}
          hsl={normalHsl}
          onChange={handleSetSat}
        />
      </SliderContainer>
      <SliderContainer>
        <label>Luminance</label>
        <LumScale
          hue={values.h}
          maxValue={400}
          value={values.l}
          hsl={normalHsl}
          onChange={handleSetLum}
        />
      </SliderContainer>
    </StyledDiv>
  );
};

export default ValueSlider;
