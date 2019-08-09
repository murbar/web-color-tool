import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import breakpoints from 'styles/breakpoints';
import colorConvert from 'colorConvert';
import ColorValues from 'components/ColorValues';
import { useSpring, animated } from 'react-spring';
import HarmonyDisplay from 'components/HarmonyDisplay';
import HarmonyToggle from 'components/HarmonyToggle';
import IconButton from 'components/common/IconButton';
import { ReactComponent as LinkIcon } from 'icons/link.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { publicURL } from 'config';
import { recordGAEvent, isBright } from 'helpers';
import useExpiresArray from 'hooks/useExpiresArray';

const ColorDisplay = styled(animated.div)`
  height: 30vh;
  min-height: 25rem;
  margin: 0 -2rem 0;
  position: relative;
  overflow: hidden;
  ${breakpoints.tall`
    height: 40vh;
  `}
  ${breakpoints.tablet`
    border-radius: 0.5em;
    margin: 0;
  `}
`;

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const LinkToStyles = styled.div`
  position: absolute;
  top: 0;
  left: 1rem;
  transform: scale(0.8);
  transform-origin: left bottom;
  ${breakpoints.tablet(css`
    right: 0;
    bottom: 1rem;
    top: auto;
    left: auto;
  `)}
`;

const LinkTo = ({ hex, addMessage }) => {
  const link = `${publicURL}/hex/${hex}`;

  return (
    <LinkToStyles>
      <CopyToClipboard
        text={link}
        onCopy={() => {
          recordGAEvent('User', 'Clicked', 'Copy link');
          addMessage('Copied link!');
        }}
      >
        <IconButton title="Copy link to this color">
          <LinkIcon />
        </IconButton>
      </CopyToClipboard>
    </LinkToStyles>
  );
};

const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  pointer-events: none;
  font-weight: bold;
  color: ${p => (p.isBright ? 'black' : 'white')};
`;

export default function Preview({ colorValues, setColor }) {
  const [showingHarmony, setShowingHarmony] = useState(null);
  const userMessages = useExpiresArray();
  const lastMessage = userMessages.count ? userMessages.items[userMessages.count - 1].data : null;
  const rgbCSS = colorConvert.rgb.toCSS(colorValues.rgb);
  const color = useSpring({
    config: { duration: 400 },
    background: rgbCSS
  });

  return (
    <Container>
      <ColorDisplay style={color}>
        <ColorValues colorValues={colorValues} addMessage={userMessages.add} />
        {lastMessage && <Message isBright={isBright(...colorValues.rgb)}>{lastMessage}</Message>}
        <HarmonyDisplay
          colorValues={colorValues}
          showing={showingHarmony}
          setColor={setColor}
          addMessage={userMessages.add}
        />
        <LinkTo hex={colorValues.hex} addMessage={userMessages.add} />
      </ColorDisplay>
      <HarmonyToggle showing={showingHarmony} setShowing={setShowingHarmony} />
    </Container>
  );
}
