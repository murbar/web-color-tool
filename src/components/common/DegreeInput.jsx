import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';

const Styles = styled(Input)`
  width: calc(3ch + 1em);
`;

// 0..360 with leading zeros
const degreeMatch = /^(0?[0-9]?[0-9]|[1-2][0-9][0-9]|3[0-5][0-9]|360)$/;

const DegreeInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    if (degreeMatch.test(value) || value === '') {
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
      placeholder="360"
      maxLength="3"
    />
  );
};

DegreeInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default DegreeInput;
