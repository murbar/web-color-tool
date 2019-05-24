import styled from 'styled-components';

export default styled.button`
  margin-right: 0.5em;
  background: ${p => p.theme.textColor};
  color: ${p => p.theme.backgroundColor};
  font-family: 'Source Code Pro', monospace;
  border: 0;
  font-size: 1em;
  padding: 0.5em 0.85em;
  border-radius: 0.3em;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${p => p.theme.highlightColor};
  }
  &:hover {
    box-shadow: 0 0 1em ${p => p.theme.textColor};
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0;
  }
`;
