import React from 'react';
import styled from 'styled-components';
import colorConvert from '../colorConvert';

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
  const rgbString = colorConvert.rgb.toCSS(values.rgb);
  const hslString = colorConvert.hsl.toCSS(values.hsl);
  return (
    <Styles>
      <div>{rgbString}</div>
      <div>{hslString}</div>
      <div>#{values.hex}</div>
    </Styles>
  );
}
