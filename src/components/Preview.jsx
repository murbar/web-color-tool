import React from 'react';
import styled from 'styled-components';

const Color = styled.div`
  width: 20rem;
  height: 20rem;
  background: ${p => p.rgbColor};
  border-radius: 1rem;
`;

const DisplayTable = styled.div`
  & > div {
    display: flex;
    & > div {
      width: 4rem;
    }
  }
`;

const ValuesTable = ({ colorValues }) => {
  return (
    <DisplayTable>
      <div>
        <div>RGB</div>
        <div>{colorValues.rgb.R}</div>
        <div>{colorValues.rgb.G}</div>
        <div>{colorValues.rgb.B}</div>
      </div>
      <div>
        <div>HSL</div>
        <div>{colorValues.hsl.H}</div>
        <div>{colorValues.hsl.S}%</div>
        <div>{colorValues.hsl.L}%</div>
      </div>
      <div>
        <div>Hex</div>
        <div>{colorValues.hex}</div>
        <div />
        <div />
      </div>
    </DisplayTable>
  );
};

export default function Preview({ colorValues }) {
  const rgbColor = `rgb(${colorValues.rgb.R}, ${colorValues.rgb.G}, ${colorValues.rgb.B})`;
  return (
    <>
      <Color rgbColor={rgbColor} />
      <ValuesTable colorValues={colorValues} />
    </>
  );
}
