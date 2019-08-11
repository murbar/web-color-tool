import React, { useRef } from 'react';
import useHotKeys from 'hooks/useHotKeys';
import { fireHotKey, recordGAEvent } from 'helpers';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from 'config';
import { usePreferences } from 'contexts/PreferencesContext';

const Hidden = styled.div`
  display: none;
`;

export default function HotKeys({ callbacks, colorValues }) {
  const { randomizeColor, adjustLum, adjustHue, adjustSat, addMessage } = callbacks;
  const copierRef = useRef();
  const { preferences, toggleTheme } = usePreferences();

  useHotKeys({
    r: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Randomize color');
      fireHotKey(e, () => {
        randomizeColor();
        addMessage('Randomized!');
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
        addMessage('Copied CSS hex value!');
      });
    },
    ArrowUp: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust luminance');
      fireHotKey(e, () => {
        adjustLum(5);
        addMessage('Lum +5%');
      });
    },
    ArrowDown: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust luminance');
      fireHotKey(e, () => {
        adjustLum(-5);
        addMessage('Lum -5%');
      });
    },
    ArrowRight: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust hue');
      fireHotKey(e, () => {
        adjustHue(12);
        addMessage('Hue +12deg');
      });
    },
    ArrowLeft: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust hue');
      fireHotKey(e, () => {
        adjustHue(-12);
        addMessage('Hue -12deg');
      });
    },
    s: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust saturation');
      fireHotKey(e, () => {
        adjustSat(5);
        addMessage('Sat +5%');
      });
    },
    d: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust saturation');
      fireHotKey(e, () => {
        adjustSat(-5);
        addMessage('Sat -5%');
      });
    },
    l: e => {
      if (config.env !== 'production')
        fireHotKey(e, () => {
          console.log('prefs', preferences);
          console.log('color', colorValues);
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
