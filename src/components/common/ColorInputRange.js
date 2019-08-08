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
    height: 4.6rem;
    background: transparent;
    border: 0.3rem solid ${p => p.theme.textColor};
    border-radius: 0.5rem;
    transform: translateX(-50%) translateY(-4.3rem);
    box-shadow: 0 0 1rem ${p => p.theme.backgroundColor};
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
