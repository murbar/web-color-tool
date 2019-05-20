import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/global';
import App from './App';

const Root = () => (
  <>
    <GlobalStyles />
    <App />
  </>
);

ReactDOM.render(<Root />, document.getElementById('root'));
