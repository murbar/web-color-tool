import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { byteMatch } from 'regexDefs';
import Input from 'components/common/Input';

const Styles = styled(Input)`
  width: calc(3ch + 1em);
`;

const ByteInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    if (byteMatch.test(value) || value === '') {
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
