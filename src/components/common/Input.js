import styled, { css } from 'styled-components';

const errorState = css`
  box-shadow: 0 0 0 0.2rem inset rgba(200, 20, 60, 0.8),
    0 0 0 0.2rem ${p => p.theme.textColor};
`;

export default styled.input`
  background: ${p => p.theme.inputColor};
  color: ${p => p.theme.textColor};
  font-family: ${p => p.theme.fontFixed};
  border: 0;
  font-size: 2rem;
  padding: 0.25em 0.5em 0.35em;
  margin: 0;
  text-align: right;
  border-radius: 0.3em;
  &:focus {
    outline: none;
    background: ${p => p.theme.textColor};
    color: ${p => p.theme.backgroundColor};
  }
  ${p => p.error && errorState}
`;
