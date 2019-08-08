import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';
import { hexCharsMatch } from '../../regexDefs';
import colorConvert from 'colorConvert';

const StyledInput = styled(Input)`
  width: calc(6ch + 1em);
`;

const validHex = value => hexCharsMatch.test(value) || value === '';

const HexInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    const valid = validHex(value);
    if (valid) onChange(e, value || '000000', name);
  };

  const handlePaste = e => {
    const { name } = e.target;
    const pasted = e.clipboardData.getData('Text/plain') || null;
    if (pasted.length === 3 && validHex(pasted)) {
      const sixDigitHex = colorConvert.hex.normalize(pasted);
      onChange(e, sixDigitHex, name);
    }
  };

  const handlePressEnter = e => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <StyledInput
      {...props}
      name={name}
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyPress={handlePressEnter}
      type="text"
      pattern="[a-fA-F\d]+"
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
