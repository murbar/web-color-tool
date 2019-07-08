import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div``;

const ColorScale = styled.div`
  height: 4rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  /* box-shadow: 0 0 1rem hsl(${p => p.hue}, 50%, 50%); */
`;

const SatScale = styled(ColorScale)`
  background: linear-gradient(to right, hsl(${p => p.hue}, 0%, 50%), hsl(${p => p.hue}, 100%, 50%));
`;

const LumScale = styled(ColorScale)`
  background: linear-gradient(
    to right,
    hsl(${p => p.hue}, 100%, 0%),
    hsl(${p => p.hue}, 100%, 50%),
    hsl(${p => p.hue}, 100%, 100%)
  );
`;

const HueScale = styled(ColorScale)`
  background: linear-gradient(
    to right,
    hsl(0, 100%, 50%),
    hsl(36, 100%, 50%),
    hsl(72, 100%, 50%),
    hsl(108, 100%, 50%),
    hsl(144, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(216, 100%, 50%),
    hsl(252, 100%, 50%),
    hsl(288, 100%, 50%),
    hsl(324, 100%, 50%),
    hsl(359, 100%, 50%)
  );
`;

const ValuePicker = ({ setColor, colorValues }) => {
  const [h, s, l] = colorValues.hsl;
  return (
    <StyledDiv>
      <h2>Picker</h2>
      <SatScale hue={h} mark={s / 100} />
      <LumScale hue={h} mark={l / 100} />
      <HueScale mark={h} />
    </StyledDiv>
  );
};

export default ValuePicker;
