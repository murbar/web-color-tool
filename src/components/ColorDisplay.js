import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import breakpoints from 'styles/breakpoints';
import colorConverter from 'colorConverter';
import ColorValues from 'components/ColorValues';
import { useSpring, animated } from 'react-spring';
import HarmonyDisplay from 'components/HarmonyDisplay';
import UserNotify from 'components/UserNotify';
import HarmonyToggle from 'components/HarmonyToggle';
import IconButton from 'components/common/IconButton';
import { ReactComponent as LinkIcon } from 'icons/link.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from 'config';
import { recordGAEvent, isBright } from 'helpers';

const Styles = styled(animated.div)`
  height: 30vh;
  min-height: 25rem;
  margin: 0 -2rem 0;
  position: relative;
  overflow: hidden;
  ${breakpoints.tall`
    height: 40vh;
  `}
  ${breakpoints.tablet`
    border-radius: 1rem;
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
  svg {
    color: ${p => (p.isBright ? p.theme.colors.offBlack : p.theme.colors.offWhite)};
  }

  ${breakpoints.tablet(css`
    right: 0;
    bottom: 1rem;
    top: auto;
    left: auto;
  `)}
`;

const LinkTo = ({ hex, addMessage, isBright }) => {
  const link = `${config.publicURL}/hex/${hex}`;

  return (
    <LinkToStyles isBright={isBright}>
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

export default function ColorDisplay({ colorValues, setColor, userMessages }) {
  const [showingHarmony, setShowingHarmony] = useState(null);
  const isBrightBg = isBright(...colorValues.rgb);
  const rgbCSS = colorConverter.rgb.toCSS(colorValues.rgb);
  const colorTransition = useSpring({
    config: { duration: config.transitionDurationMs },
    background: rgbCSS
  });

  const { add } = userMessages;
  useEffect(() => {
    if (showingHarmony) add(showingHarmony);
  }, [add, showingHarmony]);

  return (
    <Container>
      <Styles style={colorTransition}>
        <ColorValues colorValues={colorValues} addMessage={userMessages.add} />
        <UserNotify isBright={isBrightBg} messages={userMessages} />
        <HarmonyDisplay
          colorValues={colorValues}
          showing={showingHarmony}
          setColor={setColor}
          addMessage={userMessages.add}
        />
        <LinkTo hex={colorValues.hex} addMessage={userMessages.add} isBright={isBrightBg} />
      </Styles>
      <HarmonyToggle showing={showingHarmony} setShowing={setShowingHarmony} />
    </Container>
  );
}
