import React from 'react';
import styled from 'styled-components';
import InfoModal from 'components/InfoModal';

const StyledDiv = styled.div`
  margin: 2rem 0;
  position: relative;
  h1 {
    margin: 0;
  }
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
        Web color tool <span>RGB &nbsp;+&nbsp; HSL &nbsp;+&nbsp; HEX</span>
      </h1>
      <InfoModal />
    </StyledDiv>
  );
};

export default Header;
