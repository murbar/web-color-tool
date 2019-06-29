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
    width: 60%;
    position: absolute;
    top: 26%;
    left: 20%;
  }
`;

export default IconButton;
