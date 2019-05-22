import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';

const Styles = styled(Input)`
  width: calc(3ch + 1em);
`;

// 0..100 with leading zeros
const hectoMatch = /^0*(?:[0-9][0-9]?|100)$/;

const HectoInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    if (hectoMatch.test(value) || value === '') {
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
      placeholder="100"
      maxLength="3"
    />
  );
};

HectoInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default HectoInput;
