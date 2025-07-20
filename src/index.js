// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Can be used for general body/root styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);