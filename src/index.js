import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import GlobalStyles from 'styles/global';
import { dark, light } from 'styles/themes';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { validHsl, validRgb, validHex } from 'helpers';
import colorConvert from 'colorConvert';
import useLocalStorageState from 'hooks/useLocalStorageState';

const Root = () => {
  const [darkThemeToggle, setDarkThemeToggle] = useLocalStorageState('theme-preference', true);

  const toggleTheme = () => setDarkThemeToggle(prev => !prev);

  return (
    <ThemeProvider theme={darkThemeToggle ? dark : light}>
      <Router>
        <GlobalStyles />
        <Route
          path="/"
          exact
          render={() => (
            <App toggleTheme={toggleTheme} darkMode={darkThemeToggle} initialColor={null} />
          )}
        />
        <Route
          path="/hsl/:h/:s/:l"
          render={({ match }) => {
            const { h, s, l } = match.params;
            return validHsl(h, s, l) ? (
              <App
                toggleTheme={toggleTheme}
                darkMode={darkThemeToggle}
                initialColor={colorConvert.hsl.toRgb([h, s, l])}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/rgb/:r/:g/:b"
          render={({ match }) => {
            const { r, g, b } = match.params;
            return validRgb(r, g, b) ? (
              <App toggleTheme={toggleTheme} darkMode={darkThemeToggle} initialColor={[r, g, b]} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/hex/:hex"
          render={({ match }) => {
            const { hex } = match.params;
            return validHex(hex) ? (
              <App
                toggleTheme={toggleTheme}
                darkMode={darkThemeToggle}
                initialColor={colorConvert.hex.toRgb(hex)}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
