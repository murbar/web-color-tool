import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';

const Styles = styled(Input)`
  width: calc(3ch + 1em);
`;

// 000..255
const byteMatch = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/;

const ByteInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    if (byteMatch.test(value) || value === '') {
      onChange(e, parseInt(value) || 0, name);
    }
  };

  return (
    <Styles
      {...props}
      name={name}
      value={value}
      onChange={handleChange}
      type="text"
      placeholder="255"
      maxLength="3"
    />
  );
};

ByteInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default ByteInput;
