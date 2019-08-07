import React from 'react';
import styled from 'styled-components';
import Menu from 'components/Menu';

const Styles = styled.header`
  margin: 2rem 0;
  position: relative;
  h1 {
    margin: 0;
  }
  h1 span {
    display: block;
    font-size: 0.7em;
    font-weight: normal;
    line-height: 1;
  }
`;

const Header = ({ state, callbacks }) => {
  return (
    <Styles>
      <h1>
        Web color tool <span>RGB &nbsp;+&nbsp; HSL &nbsp;+&nbsp; HEX</span>
      </h1>
      <Menu state={state} callbacks={callbacks} />
    </Styles>
  );
};

export default Header;
