import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import App from './App';
import { validHsl, validRgb, validHex } from 'helpers';
import colorConvert from 'colorConvert';

const Root = () => {
  return (
    <Router>
      <Route path="/" exact render={() => <App initialColor={null} />} />
      <Route
        path="/hsl/:h/:s/:l"
        render={({ match }) => {
          const { h, s, l } = match.params;
          return validHsl(h, s, l) ? (
            <App initialColor={colorConvert.hsl.toRgb([h, s, l])} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
      <Route
        path="/rgb/:r/:g/:b"
        render={({ match }) => {
          const { r, g, b } = match.params;
          return validRgb(r, g, b) ? <App initialColor={[r, g, b]} /> : <Redirect to="/" />;
        }}
      />
      <Route
        path="/hex/:hex"
        render={({ match }) => {
          const { hex } = match.params;
          return validHex(hex) ? (
            <App initialColor={colorConvert.hex.toRgb(hex)} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
