import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconButton from 'components/common/IconButton';
import Button from 'components/common/Button';
import ButtonRow from 'components/common/ButtonRow';
import FullScreenModal from 'components/common/FullScreenModal';
// import ButtonRow from './common/ButtonRow';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { recordGAEvent } from 'helpers';

const AboutModalStyles = styled.div`
  padding: 1rem;
  .shortcuts {
    font-size: 0.9em;
    display: flex;
    flex-wrap: wrap;
    dt {
      width: 7rem;
      display: block;
      text-align: right;
    }
    dd {
      width: calc(100% - 7rem);
      display: block;
      margin: 0 0 0.75rem 0;
      padding-left: 1rem;
    }
  }
  kbd {
    font-size: 1.25em;
    background: ${p => p.theme.textColor};
    color: ${p => p.theme.backgroundColor};
    padding: 0 0.35em;
    border-radius: 0.25em;
  }
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
      {/* <FullScreenModal onClickOff={() => setShowModal(false)} isShowing={showModal}> */}
      <FullScreenModal onClickOff={() => setShowModal(false)} isShowing={true}>
        <AboutModalStyles>
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
          <h3>Keyboard shortcuts</h3>
          <dl className="shortcuts">
            <dt>
              <kbd>R</kbd>
            </dt>
            <dd>randomize values for focus color</dd>
            <dt>
              <kbd>T</kbd>
            </dt>
            <dd>toggle theme light/dark</dd>
            <dt>
              <kbd>C</kbd>
            </dt>
            <dd>copy hex value of focus color</dd>
            <dt>
              <kbd>Up</kbd>
            </dt>
            <dd>tint focus color</dd>
            <dt>
              <kbd>Down</kbd>
            </dt>
            <dd>shade focus color</dd>
            <dt>
              <kbd>Right</kbd>
            </dt>
            <dd>increment hue of focus color</dd>
            <dt>
              <kbd>Left</kbd>
            </dt>
            <dd>decrement hue of focus color</dd>
            <dt>
              <kbd>S</kbd>
            </dt>
            <dd>increase saturation of focus color</dd>
            <dt>
              <kbd>D</kbd>
            </dt>
            <dd>decrease saturation of focus color</dd>
          </dl>
          <h3>Other useful resources</h3>
          <ButtonRow>
            <Button onClick={() => setShowModal(false)}>Ok</Button>
          </ButtonRow>
        </AboutModalStyles>
      </FullScreenModal>
    </>
  );
}
