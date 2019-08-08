import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hectoMatch } from '../../regexDefs';
import Input from './Input';

const Styles = styled(Input)`
  width: calc(3ch + 1em);
`;

const HectoInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    if (hectoMatch.test(value) || value === '') {
      onChange(e, parseInt(value) || 0, name);
    }
  };

  const handlePressEnter = e => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <Styles
      {...props}
      name={name}
      value={value}
      onChange={handleChange}
      onKeyPress={handlePressEnter}
      type="number"
      pattern="\d*"
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
