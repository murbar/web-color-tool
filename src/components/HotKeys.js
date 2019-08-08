import React, { useRef } from 'react';
import useHotKeys from 'hooks/useHotKeys';
import { fireHotKey, recordGAEvent } from 'helpers';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Hidden = styled.div`
  display: none;
`;

export default function HotKeys({ callbacks, colorValues }) {
  const { randomizeColor, toggleTheme, adjustLum, adjustHue, adjustSat } = callbacks;
  const copierRef = useRef();

  useHotKeys({
    r: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Randomize color');
      fireHotKey(e, () => {
        randomizeColor();
      });
    },
    t: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Toggle theme');
      fireHotKey(e, () => {
        toggleTheme();
      });
    },
    c: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Copy base color');
      fireHotKey(e, () => {
        copierRef.current.click();
      });
    },
    ArrowUp: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust luminance');
      fireHotKey(e, () => {
        adjustLum(5);
      });
    },
    ArrowDown: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust luminance');
      fireHotKey(e, () => {
        adjustLum(-5);
      });
    },
    ArrowRight: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust hue');
      fireHotKey(e, () => {
        adjustHue(12);
      });
    },
    ArrowLeft: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust hue');
      fireHotKey(e, () => {
        adjustHue(-12);
      });
    },
    s: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust saturation');
      fireHotKey(e, () => {
        adjustSat(5);
      });
    },
    d: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust saturation');
      fireHotKey(e, () => {
        adjustSat(-5);
      });
    }
  });
  return (
    <Hidden>
      <CopyToClipboard text={`#${colorValues.hex}`}>
        <div ref={copierRef} />
      </CopyToClipboard>
    </Hidden>
  );
}
