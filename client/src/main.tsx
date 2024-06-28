import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/Colors.css';
import './css/App.css';
import './css/Reset.css';
import './css/Standard.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
