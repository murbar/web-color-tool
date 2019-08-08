import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconButton from 'components/common/IconButton';
import Button from 'components/common/Button';
import ButtonRow from 'components/common/ButtonRow';
import FullScreenModal from 'components/common/FullScreenModal';
// import ButtonRow from './common/ButtonRow';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { recordGAEvent } from 'helpers';

const ModalStyles = styled.div`
  padding: 1rem;
`;

export default function AboutModal({ isShowing = false }) {
  const [showModal, setShowModal] = useState(isShowing);

  useEffect(() => {
    setShowModal(isShowing);
  }, [isShowing]);

  return (
    <>
      <IconButton
        onClick={() => {
          setShowModal(true);
          recordGAEvent('User', 'Clicked', 'Menu - about');
        }}
        title="About this app"
        className="control"
      >
        <InfoIcon />
      </IconButton>
      <FullScreenModal onClickOff={() => setShowModal(false)} isShowing={showModal}>
        <ModalStyles>
          <h2>A color tool for developers</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo hic ullam ratione
            repudiandae, alias tenetur laboriosam iusto, voluptatum quasi suscipit rem dignissimos
            veniam nam quia error nemo et dolor non?{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo hic ullam ratione
            repudiandae, alias tenetur laboriosam iusto, voluptatum quasi suscipit rem dignissimos
            veniam nam quia error nemo et dolor non?{' '}
          </p>
          <p>
            Click the RGB/HSL/HEX data values in the color preview to copy the CSS to your
            clipboard.
          </p>
          <h3>Harmonies</h3>
          <h3>Hotkeys</h3>
          <h3>Other useful resources</h3>
          <ButtonRow>
            <Button onClick={() => setShowModal(false)}>Ok</Button>
          </ButtonRow>
        </ModalStyles>
      </FullScreenModal>
    </>
  );
}
