import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconButton from 'components/common/IconButton';
import Button from 'components/common/Button';
import ButtonRow from 'components/common/ButtonRow';
import FullScreenModal from 'components/common/FullScreenModal';
// import ButtonRow from './common/ButtonRow';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { recordGAEvent } from 'helpers';
import { ReactComponent as CompIcon } from 'icons/harm-comp.svg';
import { ReactComponent as MonoIcon } from 'icons/harm-mono.svg';
import { ReactComponent as AnaloIcon } from 'icons/harm-anl.svg';
import { ReactComponent as SplitIcon } from 'icons/harm-spt.svg';
import { ReactComponent as TriIcon } from 'icons/harm-tri.svg';
import { ReactComponent as TetIcon } from 'icons/harm-tet.svg';

const AboutModalStyles = styled.div`
  padding: 1rem;

  h3 {
    margin-bottom: 0.5rem;
  }

  ul {
    padding-left: 3rem;
  }
  li {
    font-size: 0.9em;
    margin-bottom: 0.5rem;
  }

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
    padding: 0.15em 0.35em;
    border-radius: 0.25em;
  }
`;

const Harmony = styled.div`
  display: flex;
  margin-bottom: 3rem;
  .icon {
    background: ${p => p.theme.buttonHoverColor};
    border-radius: 50%;
    padding: 1rem;
    width: 8rem;
    height: 8rem;
    svg {
      width: 6rem;
    }
  }
  .desc {
    padding-left: 1.5rem;
    h4 {
      margin: 0 0 0.5rem;
    }
  }
  p {
    margin: 0;
    font-size: 0.9em;
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
      <FullScreenModal onClickOff={() => setShowModal(false)} isShowing={showModal}>
        <AboutModalStyles>
          <h2>A color tool for developers</h2>
          <p>
            Pick a base color, tweak it until just right, explore harmonies, and copy the CSS values
            for use in your projects.{' '}
          </p>
          <p>
            Please{' '}
            <a href="https://twitter.com/murbar" target="_blank" rel="noopener noreferrer">
              share your feedback
            </a>{' '}
            &mdash; let me know if this tool is useful for you, or if you find any bugs. I'd like to
            add additional functionality in the future. What features would you like to see?
          </p>
          <h3>How to</h3>
          <ul>
            <li>Set a base color using the HSL sliders or input your values directly</li>
            <li>
              Tweak your color until it's just right - try adjusting the shade/tint & saturation
            </li>
            <li>Explore harmonies to discover new color combinations</li>
            <li>Click the values in the color display to copy the CSS to your clipboard</li>
          </ul>
          <h3>Harmonies</h3>
          <p>
            Explore color combinations by toggling one of the six harmonies via these symbols. Each
            harmony has its own mood. Use harmonies to brainstorm color combos that work well
            together.
          </p>
          <Harmony>
            <div className="icon">
              <CompIcon />
            </div>
            <div className="desc">
              <h4>Complementary</h4>
              <p>
                A color and its opposite on the color wheel, +180 degrees of hue. High contrast.
              </p>
            </div>
          </Harmony>
          <Harmony>
            <div className="icon">
              <MonoIcon />
            </div>
            <div className="desc">
              <h4>Monochromatic</h4>
              <p>Three colors of the same hue with luminance values +/-50%. Subtle and refined.</p>
            </div>
          </Harmony>
          <Harmony>
            <div className="icon">
              <AnaloIcon />
            </div>
            <div className="desc">
              <h4>Analogous</h4>
              <p>
                Three colors of the same luminance and saturation with hues that are adjacent on the
                color wheel, 30 degrees apart. Smooth transitions.
              </p>
            </div>
          </Harmony>
          <Harmony>
            <div className="icon">
              <SplitIcon />
            </div>
            <div className="desc">
              <h4>Split-complementary</h4>
              <p>
                A color and two adjacent to its complement, +/-30 degrees of hue from the value
                opposite the main color. Bold like a straight complement, but more versatile.
              </p>
            </div>
          </Harmony>
          <Harmony>
            <div className="icon">
              <TriIcon />
            </div>
            <div className="desc">
              <h4>Triadic</h4>
              <p>
                Three colors spaced evenly along the color wheel, each 120 degrees of hue apart.
                Best to allow one color to dominate and use the others as accents.
              </p>
            </div>
          </Harmony>
          <Harmony>
            <div className="icon">
              <TetIcon />
            </div>
            <div className="desc">
              <h4>Tetradic</h4>
              <p>Two sets of complementary colors, separated by 60 degrees of hue.</p>
            </div>
          </Harmony>
          <h3>Keyboard shortcuts</h3>
          <dl className="shortcuts">
            <dt>
              <kbd>R</kbd>
            </dt>
            <dd>randomize values for base color</dd>
            <dt>
              <kbd>T</kbd>
            </dt>
            <dd>toggle theme light/dark</dd>
            <dt>
              <kbd>C</kbd>
            </dt>
            <dd>copy hex value of base color</dd>
            <dt>
              <kbd>Up</kbd>
            </dt>
            <dd>tint base color</dd>
            <dt>
              <kbd>Down</kbd>
            </dt>
            <dd>shade base color</dd>
            <dt>
              <kbd>Right</kbd>
            </dt>
            <dd>increment hue of base color</dd>
            <dt>
              <kbd>Left</kbd>
            </dt>
            <dd>decrement hue of base color</dd>
            <dt>
              <kbd>S</kbd>
            </dt>
            <dd>increase saturation of base color</dd>
            <dt>
              <kbd>D</kbd>
            </dt>
            <dd>decrease saturation of base color</dd>
          </dl>
          <h3>Other resources</h3>
          <ul>
            <li>
              <a href="https://cssgradient.io/" target="_blank" rel="noopener noreferrer">
                CSS gradient tool
              </a>
            </li>
            <li>
              <a
                href="https://99designs.com/blog/tips/the-7-step-guide-to-understanding-color-theory/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fundamentals of Color Theory
              </a>{' '}
              on 99designs
            </li>
            <li>
              <a
                href="https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion"
                target="_blank"
                rel="noopener noreferrer"
              >
                RGB to HSL conversion
              </a>{' '}
              on StackOverflow - it's not trivial!
            </li>
            <li>
              <a
                href="https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Math behind colorspace conversions
              </a>{' '}
              on Waldman Media
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB"
                target="_blank"
                rel="noopener noreferrer"
              >
                HSL vs HSV explanation
              </a>{' '}
              on Wikipedia
            </li>
          </ul>
          <ButtonRow>
            <Button onClick={() => setShowModal(false)}>Ok</Button>
          </ButtonRow>
        </AboutModalStyles>
      </FullScreenModal>
    </>
  );
}
