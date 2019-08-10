import React from 'react';
import { default as Range } from 'react-input-range';
import styled from 'styled-components';

const RangeStyles = styled.div`
  .input-range {
    height: 4rem;
    position: relative;
    width: 100%;
  }

  .input-range__label {
    display: none;
  }

  .input-range__track {
    border-radius: 0.5rem;
    cursor: pointer;
    display: block;
    height: 100%;
    position: relative;
  }

  .input-range__slider {
    top: 0;
    position: absolute;
    width: 2.5rem;
    height: 4rem;
    background: transparent;
    border-radius: 0.5rem;
    margin: 0 1rem;
    transform: translateX(calc(-50% - 1rem)) translateY(-4rem);
    box-shadow: 0 0 0 0.2rem ${p => p.theme.textColor}, 0 0 0 0.4rem ${p => p.theme.backgroundColor};
    &:hover {
      cursor: pointer;
    }
  }
`;

export default function ColorInputRange({ minValue, maxValue, value, onChange, className }) {
  return (
    <RangeStyles className={className}>
      <Range minValue={minValue} maxValue={maxValue} value={value} onChange={onChange} />
    </RangeStyles>
  );
}
