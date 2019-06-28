import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  h1 span {
    display: block;
    font-size: 0.8em;
    font-weight: normal;
    line-height: 1;
  }
`;

const Header = () => {
  return (
    <StyledDiv>
      <h1>
        Color Converter <span>RGB &rarr; HSL &rarr; HEX</span>{' '}
      </h1>
    </StyledDiv>
  );
};

export default Header;
