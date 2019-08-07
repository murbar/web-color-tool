import React from 'react';
import styled, { css } from 'styled-components';
import IconButton from 'components/common/IconButton';
import colorConvert from 'colorConvert';
import breakpoints from 'styles/media';
import { useSpring, animated } from 'react-spring';
import { trueMod } from 'helpers';
import { ReactComponent as CloseIcon } from 'icons/x.svg';
import { harmonyConstants } from 'config';

const Styles = styled.div``;

const Display = styled.div`
  display: flex;
  flex: 1;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 8rem;
  ${breakpoints.tablet(css`
    width: 25%;
    height: 100%;
    flex-direction: column;
    border-radius: 0.5em;
  `)}
`;

const SwatchStyles = styled.div`
  flex: 1;
  padding: 1rem 2rem 0 0;
  text-align: right;
  span {
    padding: 0.25em 0.5em;
    border-radius: 0.3em;
    background: ${p => p.theme.previewOverlayColor};
    color: ${p => p.theme.backgroundColor};
    font-family: ${p => p.theme.fontFixed};
    font-size: 0.7em;
  }
`;

// const SwatchValue = styled(animated.span)`
//   &:before {
//     content: '#';
//   }
// `;

const AnimatedSwatch = animated(SwatchStyles);

const Swatch = ({ hex }) => {
  const [r, g, b] = colorConvert.hex.toRgb(hex);
  const valuesSpring = useSpring({
    config: { duration: 400 },
    rgb: [r, g, b]
  });
  const backgroundSpring = useSpring({
    config: { duration: 2000 },
    background: `#${hex}`
  });

  return (
    <AnimatedSwatch style={backgroundSpring}>
      <animated.span>
        {valuesSpring.rgb.interpolate((r, g, b) => colorConvert.rgb.toHex([r, g, b]))}
      </animated.span>
    </AnimatedSwatch>
  );
};

const getComplimentHex = ([h, s, l]) => {
  const complementHue = h - 180;
  return colorConvert.hsl.toHex([trueMod(complementHue, 360), s, l]);
};

const getMonochromaticHexValues = ([h, s, l]) => {
  const lumAdjust = l > 50 ? (100 - l) * 0.5 : l * 0.5;
  const hex1 = colorConvert.hsl.toHex([h, s, l + lumAdjust]);
  const hex2 = colorConvert.hsl.toHex([h, s, l - lumAdjust]);
  return [hex1, hex2];
};

const getAnalogousValues = ([h, s, l]) => {
  const hex1 = colorConvert.hsl.toHex([trueMod(h - 30, 360), s, l]);
  const hex2 = colorConvert.hsl.toHex([trueMod(h + 30, 360), s, l]);
  return [hex1, hex2];
};

const getSplitComplementValues = ([h, s, l]) => {
  const complementHue = h - 180;
  const hex1 = colorConvert.hsl.toHex([trueMod(complementHue - 30, 360), s, l]);
  const hex2 = colorConvert.hsl.toHex([trueMod(complementHue + 30, 360), s, l]);
  return [hex1, hex2];
};

const getTriadicValues = ([h, s, l]) => {
  const complementHue = h - 180;
  const hex1 = colorConvert.hsl.toHex([trueMod(complementHue - 60, 360), s, l]);
  const hex2 = colorConvert.hsl.toHex([trueMod(complementHue + 60, 360), s, l]);
  return [hex1, hex2];
};

const getTetradicValues = ([h, s, l]) => {
  const hex1 = colorConvert.hsl.toHex([trueMod(h - 180, 360), s, l]);
  const hex2 = colorConvert.hsl.toHex([trueMod(h - 120, 360), s, l]);
  const hex3 = colorConvert.hsl.toHex([trueMod(h - 300, 360), s, l]);
  return [hex1, hex2, hex3];
};

export default function HarmonyDisplay({ colorValues, showing, setShowing }) {
  const { hsl } = colorValues;

  return (
    <Styles>
      {showing !== null && (
        <Display>
          {showing === harmonyConstants.CO && <Swatch hex={getComplimentHex(hsl)} />}
          {showing === harmonyConstants.MO && (
            <>
              {getMonochromaticHexValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonyConstants.AN && (
            <>
              {getAnalogousValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonyConstants.SP && (
            <>
              {getSplitComplementValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonyConstants.TR && (
            <>
              {getTriadicValues(hsl).map(hex => (
                <Swatch key={hex} hex={hex} />
              ))}
            </>
          )}
          {showing === harmonyConstants.TE && (
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
