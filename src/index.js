import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import { PreferencesProvider } from 'contexts/preferencesContext';
import { BaseColorProvider } from 'contexts/baseColorContext';
import { validHsl, validRgb, validHex } from 'colorUtils';
import { initializeGA, initializeSentry } from 'helpers';
import colorConverter from 'colorConverter';

initializeGA();
initializeSentry();

const Root = () => {
  return (
    // <React.StrictMode>
    <PreferencesProvider>
      <BaseColorProvider>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <App initialHsl4x={null} />} />
            <Route
              path="/hsl/:h/:s/:l"
              render={({ match }) => {
                const { h, s, l } = match.params;
                return validHsl(h, s, l) ? (
                  <App initialHsl4x={[h, s, l].map(v => v * 4)} />
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
                  <App initialHsl4x={colorConverter.rgb.toHsl4x([r, g, b])} />
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
                  <App initialHsl4x={colorConverter.hex.toHsl4x(hex)} />
                ) : (
                  <Redirect to="/" />
                );
              }}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </BaseColorProvider>
    </PreferencesProvider>

    // </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
