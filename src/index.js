import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import { validHsl, validRgb, validHex } from 'colorUtils';
import { initializeGA } from 'helpers';
import colorConverter from 'colorConverter';

initializeGA();
Sentry.init({ dsn: 'https://4ce61244b73c47a2806e2f9cefeaf925@sentry.io/1527263' });

const Root = () => {
  return (
    // <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact render={() => <App initialColorHsl={null} />} />
        <Route
          path="/hsl/:h/:s/:l"
          render={({ match }) => {
            const { h, s, l } = match.params;
            return validHsl(h, s, l) ? <App initialColorHsl={[h, s, l]} /> : <Redirect to="/" />;
          }}
        />
        <Route
          path="/rgb/:r/:g/:b"
          render={({ match }) => {
            const { r, g, b } = match.params;
            return validRgb(r, g, b) ? (
              <App initialColorHsl={colorConverter.rgb.toHsl([r, g, b])} />
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
              <App initialColorHsl={colorConverter.hex.toHsl(hex)} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
    // </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
