import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';
import { animated, interpolate } from 'react-spring';

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin: 1rem 1rem 0 auto;
    padding: 0.25em 0.5em;
    font-family: 'Source Code Pro', monospace;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.5em;
  }
`;

export default function ColorValues({ values }) {
  return (
    <Styles>
      <div>
        RGB
        <animated.span>
          {values.rgb.interpolate((...rgb) => {
            const [r, g, b] = rgb.map(v => Math.round(v));
            return ` ${r}, ${g}, ${b}`;
          })}
        </animated.span>
      </div>
      <div>
        HSL
        <animated.span>
          {values.hsl.interpolate((...hsl) => {
            const [h, s, l] = hsl.map(v => Math.round(v));
            return ` ${h}, ${s}%, ${l}%`;
          })}
        </animated.span>
      </div>
      <div>
        HEX #
        <animated.span>
          {values.rgb.interpolate((r, g, b) => colorConvert.rgb.toHex([r, g, b]))}
        </animated.span>
      </div>
    </Styles>
  );
}
