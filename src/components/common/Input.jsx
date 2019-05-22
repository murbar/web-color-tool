import styled, { css } from 'styled-components';

const errorState = css`
  box-shadow: 0 0 0 0.1em inset rgba(200, 20, 60, 0.8);
`;

export default styled.input`
  background: #333;
  color: #efefef;
  font-family: 'Source Code Pro', monospace;
  border: 0;
  font-size: 2rem;
  padding: 0.25em 0.5em;
  text-align: right;
  border-radius: 0.5em;
  ${p => p.error && errorState}
`;
