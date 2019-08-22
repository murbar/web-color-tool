import React, { useRef } from 'react';
import useHotKeys from 'hooks/useHotKeys';
import { fireHotKey, recordGAEvent } from 'helpers';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from 'config';
import { usePreferences } from 'contexts/preferencesContext';
import { useBaseColor } from 'contexts/baseColorContext';

const Hidden = styled.div`
  display: none;
`;

export default function HotKeys({ callbacks }) {
  const { preferences, toggleTheme } = usePreferences();
  const {
    baseColor,
    randomizeBase,
    adjustBaseHue,
    adjustBaseSat,
    adjustBaseLum
  } = useBaseColor();
  const { addMessage } = callbacks;
  const copierRef = useRef();

  useHotKeys({
    r: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Randomize color');
      fireHotKey(e, () => {
        randomizeBase();
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
        adjustBaseLum(5);
        addMessage('Lum +5%');
      });
    },
    ArrowDown: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust luminance');
      fireHotKey(e, () => {
        adjustBaseLum(-5);
        addMessage('Lum -5%');
      });
    },
    ArrowRight: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust hue');
      fireHotKey(e, () => {
        adjustBaseHue(12);
        addMessage('Hue +12deg');
      });
    },
    ArrowLeft: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust hue');
      fireHotKey(e, () => {
        adjustBaseHue(-12);
        addMessage('Hue -12deg');
      });
    },
    s: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust saturation');
      fireHotKey(e, () => {
        adjustBaseSat(5);
        addMessage('Sat +5%');
      });
    },
    d: e => {
      recordGAEvent('User', 'Triggered hotkey', 'Adjust saturation');
      fireHotKey(e, () => {
        adjustBaseSat(-5);
        addMessage('Sat -5%');
      });
    },
    l: e => {
      if (config.env !== 'production')
        fireHotKey(e, () => {
          console.log('prefs', preferences);
          console.log('base color', baseColor);
        });
    }
  });

  return (
    <Hidden>
      <CopyToClipboard text={`#${baseColor.hex}`}>
        <div ref={copierRef} />
      </CopyToClipboard>
    </Hidden>
  );
}
