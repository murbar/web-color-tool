import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PreferencesProvider } from 'contexts/preferencesContext';
import { BaseColorProvider } from 'contexts/baseColorContext';
import { initializeGA, initializeSentry } from 'helpers';

initializeGA();
initializeSentry();

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <PreferencesProvider>
          <BaseColorProvider>
            <App />
          </BaseColorProvider>
        </PreferencesProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
