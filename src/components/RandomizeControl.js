import React from 'react';
import IconButton from 'components/common/IconButton';
import { ReactComponent as Random } from 'icons/shuffle.svg';
import { recordGAEvent } from 'helpers';
import { useBaseColor } from 'contexts/baseColorContext';

const RandomizeControl = () => {
  const { randomizeBase } = useBaseColor();

  return (
    <IconButton
      onClick={() => {
        randomizeBase();
        recordGAEvent('User', 'Clicked', 'Menu - randomize color');
      }}
      title="Randomize color values"
    >
      <Random />
    </IconButton>
  );
};

export default RandomizeControl;
