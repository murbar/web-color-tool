import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './styles/global';
import { dark, light } from './styles/themes';
import { ThemeProvider } from 'styled-components';
import App from './App';
import ThemeSwitch from './components/ThemeSwitch';

const Root = () => {
  const [darkThemeToggle, setDarkThemeToggle] = useState(true);

  return (
    <ThemeProvider theme={darkThemeToggle ? dark : light}>
      <Router>
        <GlobalStyles />
        <App />
        <ThemeSwitch onToggle={() => setDarkThemeToggle(prev => !prev)} />
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
