import React from 'react';
import IconButton from 'components/common/IconButton';
import { ReactComponent as Random } from 'icons/shuffle.svg';
import { recordGAEvent } from 'helpers';

const RandomizeControl = ({ onClick }) => {
  return (
    <IconButton
      onClick={() => {
        onClick();
        recordGAEvent('User', 'Clicked', 'Menu - randomize color');
      }}
      title="Randomize color values"
    >
      <Random />
    </IconButton>
  );
};

export default RandomizeControl;
