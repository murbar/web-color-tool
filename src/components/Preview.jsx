import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  width: 20rem;
  height: 20rem;
  background: ${p => p.rgbColor};
  border-radius: 3rem;
`;

export default function Preview({ rgb }) {
  const rgbColor = `rgb(${rgb.R}, ${rgb.G}, ${rgb.B})`;
  return <Styles rgbColor={rgbColor} />;
}
