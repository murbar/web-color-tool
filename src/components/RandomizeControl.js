import React from 'react';
import IconButton from 'components/common/IconButton';
import { ReactComponent as Random } from 'icons/shuffle.svg';

const RandomizeControl = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} title="Randomize color values">
      <Random />
    </IconButton>
  );
};

export default RandomizeControl;
