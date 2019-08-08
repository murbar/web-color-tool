import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useHotKeys from 'hooks/useHotKeys';
import { fireHotKey, recordGAEvent } from 'helpers';

const Styles = styled.div`
  display: none;
`;

export default function HiddenClipboardCopier({ hex }) {
  const copierRef = React.useRef();

  useHotKeys({
    c: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Copy focus color');
      fireHotKey(e, () => {
        copierRef.current.click();
      });
    }
  });

  return (
    <Styles>
      <CopyToClipboard text={`#${hex}`} onCopy={() => console.log('copied')}>
        <div ref={copierRef} />
      </CopyToClipboard>
    </Styles>
  );
}
