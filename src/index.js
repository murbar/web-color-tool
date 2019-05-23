import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import GlobalStyles from './styles/global';
import { dark, light } from './styles/themes';
import { ThemeProvider } from 'styled-components';
import App from './App';

ReactGA.initialize('UA-140727716-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const Root = () => {
  const [darkThemeToggle, setDarkThemeToggle] = useState(true);

  const toggleTheme = () => setDarkThemeToggle(prev => !prev);

  return (
    <ThemeProvider theme={darkThemeToggle ? dark : light}>
      <Router>
        <GlobalStyles />
        <App toggleTheme={toggleTheme} darkMode={darkThemeToggle} />
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
