import styled, { css } from 'styled-components';

const errorState = css`
  box-shadow: 0 0 0 0.2rem inset rgba(200, 20, 60, 0.8), 0 0 0 0.2rem ${p => p.theme.highlightColor};
`;

export default styled.input`
  background: ${p => p.theme.inputColor};
  color: ${p => p.theme.textColor};
  font-family: 'Source Code Pro', monospace;
  border: 0;
  font-size: 2rem;
  padding: 0.25em 0.5em;
  text-align: right;
  border-radius: 0.3em;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${p => p.theme.highlightColor};
  }
  ${p => p.error && errorState}
`;
