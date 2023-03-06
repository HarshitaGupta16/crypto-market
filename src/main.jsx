import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ThemeContext from './contexts/ThemeContext';
import CryptoContext from './contexts/CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeContext>
      <CryptoContext>
        <App />
      </CryptoContext>
    </ThemeContext>
    </BrowserRouter>
  </React.StrictMode>,
);
