import styled from 'styled-components';
import Button from 'components/common/Button';

const IconButton = styled(Button)`
  border: none;
  background: transparent;
  color: ${p => p.theme.textColor};
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  svg {
    height: 3rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    pointer-events: none;
  }
`;

export default IconButton;
