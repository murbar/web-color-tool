import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  margin-top: 2rem;
  pointer-events: auto;
`;

export default function ButtonRow({ children }) {
  return <Styles>{children}</Styles>;
}
