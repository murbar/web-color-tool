import styled from 'styled-components';

export default styled.div`
  display: inline-block;
  background: ${p => p.theme.inputColor};
  border-radius: 0.3em;
  &:focus {
    box-shadow: 0 0 0 0.2rem ${p => p.theme.textColor};
  }
  input {
    background: transparent;
  }
`;
