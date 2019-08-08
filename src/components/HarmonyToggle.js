import React from 'react';
import styled from 'styled-components';
import IconButton from 'components/common/IconButton';
import { ReactComponent as CompIcon } from 'icons/harm-comp.svg';
import { ReactComponent as MonoIcon } from 'icons/harm-mono.svg';
import { ReactComponent as AnaloIcon } from 'icons/harm-anl.svg';
import { ReactComponent as SplitIcon } from 'icons/harm-spt.svg';
import { ReactComponent as TriIcon } from 'icons/harm-tri.svg';
import { ReactComponent as TetIcon } from 'icons/harm-tet.svg';
import { harmonyConstants } from 'config';
import { recordGAEvent } from 'helpers';

const Styles = styled.div``;

const Toggle = styled.div`
  display: flex;
  margin-top: 1.5rem;
  left: 0;
  justify-content: space-between;
  transform-origin: center right;
  button.active {
    background: ${p => p.theme.buttonHighlightColor};
  }
`;

export default function HarmonyToggle({ showing, setShowing }) {
  const toggle = harmony => {
    if (showing === harmony) {
      setShowing(null);
    } else {
      setShowing(harmony);
    }
  };

  const getTitle = harmony => {
    return `${showing ? 'Hide' : 'Show'} ${harmony} harmony`;
  };

  return (
    <Styles>
      <Toggle onClick={() => recordGAEvent('User', 'Clicked', 'Harmony toggle')}>
        <IconButton
          onClick={() => toggle(harmonyConstants.CO)}
          title={getTitle(harmonyConstants.CO)}
          className={showing === harmonyConstants.CO ? 'active' : null}
        >
          <CompIcon />
        </IconButton>
        <IconButton
          onClick={() => toggle(harmonyConstants.MO)}
          title={getTitle(harmonyConstants.MO)}
          className={showing === harmonyConstants.MO ? 'active' : null}
        >
          <MonoIcon />
        </IconButton>
        <IconButton
          onClick={() => toggle(harmonyConstants.AN)}
          title={getTitle(harmonyConstants.AN)}
          className={showing === harmonyConstants.AN ? 'active' : null}
        >
          <AnaloIcon />
        </IconButton>
        <IconButton
          onClick={() => toggle(harmonyConstants.SP)}
          title={getTitle(harmonyConstants.SP)}
          className={showing === harmonyConstants.SP ? 'active' : null}
        >
          <SplitIcon />
        </IconButton>
        <IconButton
          onClick={() => toggle(harmonyConstants.TR)}
          title={getTitle(harmonyConstants.TR)}
          className={showing === harmonyConstants.TR ? 'active' : null}
        >
          <TriIcon />
        </IconButton>
        <IconButton
          onClick={() => toggle(harmonyConstants.TE)}
          title={getTitle(harmonyConstants.TE)}
          className={showing === harmonyConstants.TE ? 'active' : null}
        >
          <TetIcon />
        </IconButton>
      </Toggle>
    </Styles>
  );
}
