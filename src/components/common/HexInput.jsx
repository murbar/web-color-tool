import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorConvert from '../../colorConvert';
import Input from './Input';

const Styles = styled(Input)`
  width: calc(6ch + 1em);
`;

// 000..FFF or 000000..FFFFFF
// const hexMatch = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;
// 0..FFFFFF
const hexMatch = /^[0-9a-f]{1,6}$/i;

const validHex = value => hexMatch.test(value) || value === '';

const HexInput = props => {
  const { name, value, onChange } = props;
  // let lastValidValue = useRef(value);

  const handleChange = e => {
    const { value, name } = e.target;
    const valid = validHex(value);
    if (valid) onChange(e, value || '000000', name);
  };

  // const handleBlur = e => {
  //   const { value, name } = e.target;
  //   const valid = validHex(value);
  //   console.log(lastValidValue.current);
  //   if (!valid) onChange(e, lastValidValue.current || '000000', name, true);
  // };

  return (
    <Styles
      {...props}
      name={name}
      value={value}
      onChange={handleChange}
      // onBlur={handleBlur}
      type="text"
      placeholder="FFFFFF"
      maxLength="6"
    />
  );
};

HexInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default HexInput;
