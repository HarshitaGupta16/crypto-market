import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ThemeContext from './contexts/ThemeContext';
import CryptoContext from './contexts/CryptoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContext>
      <CryptoContext>
        <App />
      </CryptoContext>
    </ThemeContext>
  </React.StrictMode>,
);
