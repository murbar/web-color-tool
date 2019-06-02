import styled from 'styled-components';
import Button from 'components/common/Button';

const IconButton = styled(Button)`
  border: none;
  background: transparent;
  color: ${p => p.theme.textColor};
  padding: 1rem;
  border-radius: 50%;
  svg {
    width: 3rem;
  }
  &:hover {
    box-shadow: none;
  }
`;

export default IconButton;
