import React from 'react';
import styled, { css } from 'styled-components';
import colorConverter from 'colorConverter';
import breakpoints from 'styles/breakpoints';
import { useSpring, animated } from 'react-spring';
import { trueMod, recordGAEvent, isBright } from 'helpers';
import config from 'config';
import IconButton from 'components/common/IconButton';
import { ReactComponent as MaxIcon } from 'icons/maximize.svg';
import { ReactComponent as LinkIcon } from 'icons/link.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
    background: ${p =>
      p.isBright ? p.theme.preview.brightOverlayBg : p.theme.preview.darkOverlayBg};
    color: ${p => (p.isBright ? p.theme.colors.offBlack : p.theme.colors.offWhite)};
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
  svg {
    color: ${p => (p.isBright ? p.theme.colors.offBlack : p.theme.colors.offWhite)};
  }
  ${IconButton} {
    margin: 0;
  }
  ${breakpoints.tablet(css`
    display: flex;
    flex-direction: column-reverse;
  `)}
`;

const Swatch = ({ hex, setColor, addMessage }) => {
  const [r, g, b] = colorConverter.hex.toRgb(hex);
  const isBrightBg = isBright(r, g, b);
  const duration = config.transitionDurationMs;
  const valuesSpring = useSpring({
    config: { duration },
    rgb: [r, g, b]
  });
  const backgroundSpring = useSpring({
    config: { duration },
    background: `#${hex}`
  });
  const link = `${config.publicURL}/hex/${hex}`;

  return (
    <AnimatedSwatch style={backgroundSpring} isBright={isBrightBg}>
      <CopyToClipboard
        text={`#${hex}`}
        onCopy={() => {
          recordGAEvent('User', 'Clicked', 'Copy color');
          addMessage('Copied CSS value!');
        }}
      >
        <span title={`Copy CSS value "#${hex}"`}>
          #
          <animated.span>
            {valuesSpring.rgb.interpolate((r, g, b) => colorConverter.rgb.toHex([r, g, b]))}
          </animated.span>
        </span>
      </CopyToClipboard>
      <Buttons isBright={isBrightBg}>
        <IconButton
          title="Set base color"
          onClick={() => {
            setColor(colorConverter.rgb.toHsl4x([r, g, b]));
            recordGAEvent('User', 'Clicked', 'Set base color');
          }}
        >
          <MaxIcon />
        </IconButton>
        <CopyToClipboard
          text={link}
          onCopy={() => {
            recordGAEvent('User', 'Clicked', 'Copy link');
            addMessage('Copied link!');
          }}
        >
          <IconButton title="Copy link to this color">
            <LinkIcon />
          </IconButton>
        </CopyToClipboard>
      </Buttons>
    </AnimatedSwatch>
  );
};

const getComplimentHex = ([h, s, l]) => {
  const complementHue = h - 180;
  return colorConverter.hsl.toHex([trueMod(complementHue, 360), s, l]);
};

const getMonochromaticHexValues = ([h, s, l]) => {
  const lumAdjust = l > 50 ? (100 - l) * 0.5 : l * 0.5;
  const hex1 = colorConverter.hsl.toHex([h, s, l + lumAdjust]);
  const hex2 = colorConverter.hsl.toHex([h, s, l - lumAdjust]);
  return [hex1, hex2];
};

const getAnalogousValues = ([h, s, l]) => {
  const hex1 = colorConverter.hsl.toHex([trueMod(h - 30, 360), s, l]);
  const hex2 = colorConverter.hsl.toHex([trueMod(h + 30, 360), s, l]);
  return [hex1, hex2];
};

const getSplitComplementValues = ([h, s, l]) => {
  const complementHue = h - 180;
  const hex1 = colorConverter.hsl.toHex([trueMod(complementHue - 30, 360), s, l]);
  const hex2 = colorConverter.hsl.toHex([trueMod(complementHue + 30, 360), s, l]);
  return [hex1, hex2];
};

const getTriadicValues = ([h, s, l]) => {
  const complementHue = h - 180;
  const hex1 = colorConverter.hsl.toHex([trueMod(complementHue - 60, 360), s, l]);
  const hex2 = colorConverter.hsl.toHex([trueMod(complementHue + 60, 360), s, l]);
  return [hex1, hex2];
};

const getTetradicValues = ([h, s, l]) => {
  const hex1 = colorConverter.hsl.toHex([trueMod(h - 180, 360), s, l]);
  const hex2 = colorConverter.hsl.toHex([trueMod(h - 120, 360), s, l]);
  const hex3 = colorConverter.hsl.toHex([trueMod(h - 300, 360), s, l]);
  return [hex1, hex2, hex3];
};

export default function HarmonyDisplay({ colorValues, showing, setColor, addMessage }) {
  const { hsl } = colorValues;
  const { harmonyConstants } = config;

  // key must be index for spring animations to work
  return (
    <Styles>
      {showing !== null && (
        <Display>
          {showing === harmonyConstants.CO && (
            <Swatch setColor={setColor} hex={getComplimentHex(hsl)} addMessage={addMessage} />
          )}

          {showing === harmonyConstants.MO &&
            getMonochromaticHexValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} addMessage={addMessage} />
            ))}

          {showing === harmonyConstants.AN &&
            getAnalogousValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} addMessage={addMessage} />
            ))}

          {showing === harmonyConstants.SP &&
            getSplitComplementValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} addMessage={addMessage} />
            ))}

          {showing === harmonyConstants.TR &&
            getTriadicValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} addMessage={addMessage} />
            ))}

          {showing === harmonyConstants.TE &&
            getTetradicValues(hsl).map((hex, i) => (
              <Swatch setColor={setColor} key={i} hex={hex} addMessage={addMessage} />
            ))}
        </Display>
      )}
    </Styles>
  );
}
