import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global';
import { dark, light } from 'styles/themes';
import breakpoints from 'styles/breakpoints';
import config from 'config';
import { recordGAPageView } from 'helpers';
import { usePreferences } from 'contexts/preferencesContext';
import { useBaseColor } from 'contexts/baseColorContext';
import ErrorBoundary from 'components/ErrorBoundary';
import HotKeys from 'components/HotKeys';
import Header from 'components/Header';
import ValueInputs from 'components/ValueInputs';
import ColorDisplay from 'components/ColorDisplay';
import ColorAdjustControls from 'components/ColorAdjustControls';
import ValueSliders from 'components/ValueSliders';
import Footer from 'components/Footer';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useKeyboardQuery from 'hooks/useKeyboardQuery';
import useExpiresArray from 'hooks/useExpiresArray';
import useColorRouteOnMount from 'hooks/useColorRouteOnMount';
import About from 'components/About';

recordGAPageView('/');

const AppStyles = styled.div`
  padding: 0 2rem 3rem;
  max-width: 100rem;
  margin: 0 auto;
  ${breakpoints.tablet`
      padding: 0 4rem 3rem;
    `}
`;

export default function App() {
  const { preferences } = usePreferences();
  const { baseColor } = useBaseColor();
  const { pageTitle } = config;
  const userMessages = useExpiresArray([], 2000);

  useColorRouteOnMount();
  useDocumentTitle(`#${baseColor.hex} - ${pageTitle}`);
  useKeyboardQuery('using-keyboard');

  return (
    <ErrorBoundary>
      <ThemeProvider theme={preferences.darkTheme ? dark : light}>
        <AppStyles>
          <GlobalStyles />
          <HotKeys
            callbacks={{
              addMessage: userMessages.add
            }}
          />
          <Header />
          <ValueInputs />
          <ColorDisplay userMessages={userMessages} />
          <ColorAdjustControls />
          <ValueSliders />
          <About />
          <Footer />
        </AppStyles>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
