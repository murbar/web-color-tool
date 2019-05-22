import React from 'react';
// import styled from 'styled-components';
import HexForm from './HexForm';
import RgbForm from './RgbForm';
import HslForm from './HslForm';

const Inputs = ({ setColor, colorValues }) => {
  return (
    <div>
      <HexForm setColor={setColor} colorValues={colorValues} />
      <RgbForm setColor={setColor} colorValues={colorValues} />
      <HslForm setColor={setColor} colorValues={colorValues} />
    </div>
  );
};

export default Inputs;
