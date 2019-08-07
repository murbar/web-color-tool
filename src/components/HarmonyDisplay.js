import React from 'react';
import styled, { css } from 'styled-components';
import colorConvert from 'colorConvert';
import breakpoints from 'styles/breakpoints';
import { useSpring, animated } from 'react-spring';
import { trueMod } from 'helpers';
import { harmonyConstants } from 'config';
import IconButton from 'components/common/IconButton';
import { ReactComponent as MaxIcon } from 'icons/maximize.svg';
import { ReactComponent as LinkIcon } from 'icons/link.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { publicURL } from 'config';

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
  position: relative;
  > span {
    padding: 0.25em 0.5em;
    border-radius: 0.3em;
    background: ${p => p.theme.previewOverlayColor};
    color: ${p => p.theme.backgroundColor};
    font-family: ${p => p.theme.fontFixed};
    font-size: 0.7em;
    cursor: copy;
  }
`;

const AnimatedSwatch = animated(SwatchStyles);

const Buttons = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  transform: scale(0.7);
  transform-origin: left bottom;
  ${IconButton} {
    margin: 0;
  }
  ${breakpoints.tablet(css`
    display: flex;
    flex-direction: column-reverse;
  `)}
`;

const Swatch = ({ hex, setColor }) => {
  const [r, g, b] = colorConvert.hex.toRgb(hex);
  const valuesSpring = useSpring({
    config: { duration: 400 },
    rgb: [r, g, b]
  });
  const backgroundSpring = useSpring({
    config: { duration: 400 },
    background: `#${hex}`
  });
  const link = `${publicURL}/hex/${hex}`;

  return (
    <AnimatedSwatch style={backgroundSpring}>
      <CopyToClipboard text={`#${hex}`}>
        <span title={`Copy CSS value "#${hex}"`}>
          #
          <animated.span>
            {valuesSpring.rgb.interpolate((r, g, b) => colorConvert.rgb.toHex([r, g, b]))}
          </animated.span>
        </span>
      </CopyToClipboard>
      <Buttons>
        <IconButton title="Set to focus color" onClick={() => setColor([r, g, b])}>
          <MaxIcon />
        </IconButton>
        <CopyToClipboard text={link}>
          <IconButton title={`Copy link to #${hex}`}>
            <LinkIcon />
          </IconButton>
        </CopyToClipboard>
      </Buttons>
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

export default function HarmonyDisplay({ colorValues, showing, setColor }) {
  const { hsl } = colorValues;

  // key must be index for spring animations to work
  return (
    <Styles>
      {showing !== null && (
        <Display>
          {showing === harmonyConstants.CO && (
            <Swatch setColor={setColor} hex={getComplimentHex(hsl)} />
          )}

          {showing === harmonyConstants.MO &&
            getMonochromaticHexValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} />
            ))}

          {showing === harmonyConstants.AN &&
            getAnalogousValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} />
            ))}

          {showing === harmonyConstants.SP &&
            getSplitComplementValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} />
            ))}

          {showing === harmonyConstants.TR &&
            getTriadicValues(hsl).map((hex, i) => <Swatch setColor={setColor} key={i} hex={hex} />)}

          {showing === harmonyConstants.TE &&
            getTetradicValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} />
            ))}
        </Display>
      )}
    </Styles>
  );
}
