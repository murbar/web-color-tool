import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global';
import config from 'config';
import { dark, light } from 'styles/themes';
import breakpoints from 'styles/breakpoints';
import { usePreferences } from 'contexts/preferencesContext';
import { useBaseColor } from 'contexts/baseColorContext';
import ErrorBoundary from 'components/ErrorBoundary';
import ColorDisplay from 'components/ColorDisplay';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ColorAdjustControls from 'components/ColorAdjustControls';
import ValueInputs from 'components/ValueInputs';
import ValueSliders from 'components/ValueSliders';
import HotKeys from 'components/HotKeys';
import useExpiresArray from 'hooks/useExpiresArray';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';
import useKeyboardQuery from 'hooks/useKeyboardQuery';

const AppStyles = styled.div`
  padding: 0 2rem 3rem;
  max-width: 100rem;
  margin: 0 auto;
  ${breakpoints.tablet`
      padding: 0 4rem 3rem;
    `}
`;

function App({ initialHsl4x, location }) {
  const { preferences } = usePreferences();
  const { baseColor, setBaseHslPrecise } = useBaseColor();
  const { pageTitle } = config;
  const userMessages = useExpiresArray([], 2000);

  useDocumentTitle(`#${baseColor.hex} - ${pageTitle}`);

  useKeyboardQuery('using-keyboard');

  useAnalyticsPageView(location);

  useEffect(() => {
    if (initialHsl4x) setBaseHslPrecise(initialHsl4x);
  }, [initialHsl4x, setBaseHslPrecise]);

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
          <Footer />
        </AppStyles>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default withRouter(App);
