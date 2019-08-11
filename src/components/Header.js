import React from 'react';
import styled from 'styled-components';
import Menu from 'components/Menu';

const Styles = styled.header`
  margin: 2rem 0;
  position: relative;
  padding-right: 20%;
  h1 {
    margin: 0;
  }
  h1 span {
    display: block;
    font-size: 0.6em;
    font-weight: normal;
  }
`;

const Header = ({ preferences, callbacks }) => {
  return (
    <Styles>
      <h1>
        Web color tool <span>Convert RGB / HSL / Hex & explore harmonies</span>
      </h1>
      <Menu preferences={preferences} callbacks={callbacks} />
    </Styles>
  );
};

export default Header;
