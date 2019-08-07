import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from 'components/common/IconButton';
import colorConvert from '../colorConvert';
import { useSpring, animated } from 'react-spring';

const harmonies = {
  CO: 'Complementary',
  MO: 'Monochromatic',
  AN: 'Analogous',
  SP: 'Split Complementary',
  TR: 'Triadic',
  TE: 'Tetradic'
};

const Styles = styled.div``;
const Toggle = styled.div`
  text-align: center;
`;
const Display = styled.div`
  display: flex;
  background: white;
  position: absolute;
  width: 100%;
  height: 8rem;
  left: 0;
  bottom: 0;
  h3 {
    position: absolute;
    top: -3em;
  }
`;
const SwatchStyles = styled(animated.div)`
  background: #${p => p.hex};
  flex: 1;
`;

const Swatch = ({ hex }) => {
  const transition = useSpring({
    config: { duration: 400 },
    background: `#${hex}`
  });
  return (
    <SwatchStyles style={transition} hex={hex}>
      #{hex}
    </SwatchStyles>
  );
};

const getComplimentHex = ([h, s, l]) => {
  const complementHue = (h - 180) % 360;
  return colorConvert.hsl.toHex([complementHue, s, l]);
};

const getMonochromaticHexValues = ([h, s, l]) => {
  const lumAdjust = l > 50 ? (100 - l) * 0.5 : l * 0.5;
  const hex1 = colorConvert.hsl.toHex([h, s, l + lumAdjust]);
  const hex2 = colorConvert.hsl.toHex([h, s, l - lumAdjust]);
  return [hex1, hex2];
};

const getAnalogousValues = ([h, s, l]) => {
  const hex1 = colorConvert.hsl.toHex([h - 30, s, l]);
  const hex2 = colorConvert.hsl.toHex([h + 30, s, l]);
  return [hex1, hex2];
};

const getSplitComplementValues = ([h, s, l]) => {
  const complementHue = (h - 180) % 360;
  const hex1 = colorConvert.hsl.toHex([complementHue - 30, s, l]);
  const hex2 = colorConvert.hsl.toHex([complementHue + 30, s, l]);
  return [hex1, hex2];
};

const getTriadicValues = ([h, s, l]) => {
  const complementHue = (h - 180) % 360;
  const hex1 = colorConvert.hsl.toHex([complementHue - 60, s, l]);
  const hex2 = colorConvert.hsl.toHex([complementHue + 60, s, l]);
  return [hex1, hex2];
};

const getTetradicValues = ([h, s, l]) => {
  const complementHue = (h - 180) % 360;
  const hex1 = colorConvert.hsl.toHex([complementHue, s, l]);
  const hex2 = colorConvert.hsl.toHex([complementHue + 60, s, l]);
  const hex3 = colorConvert.hsl.toHex([complementHue - 120, s, l]);
  return [hex1, hex2, hex3];
};

export default function Harmonies({ hsl }) {
  const [showing, setShowing] = useState(null);

  return (
    <Styles>
      <Toggle>
        {showing !== null && <IconButton onClick={() => setShowing(null)}>X</IconButton>}
        <IconButton onClick={() => setShowing(harmonies.CO)}>Comp</IconButton>
        <IconButton onClick={() => setShowing(harmonies.MO)}>Mono</IconButton>
        <IconButton onClick={() => setShowing(harmonies.AN)}>Anal</IconButton>
        <IconButton onClick={() => setShowing(harmonies.SP)}>Splt</IconButton>
        <IconButton onClick={() => setShowing(harmonies.TR)}>Tri</IconButton>
        <IconButton onClick={() => setShowing(harmonies.TE)}>Te</IconButton>
      </Toggle>
      {showing !== null && (
        <Display>
          <h3>{showing}</h3>
          {showing === harmonies.CO && <Swatch hex={getComplimentHex(hsl)} />}
          {showing === harmonies.MO && (
            <>
              {getMonochromaticHexValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonies.AN && (
            <>
              {getAnalogousValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonies.SP && (
            <>
              {getSplitComplementValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonies.TR && (
            <>
              {getTriadicValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonies.TE && (
            <>
              {getTetradicValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
        </Display>
      )}
    </Styles>
  );
}
