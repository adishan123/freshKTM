import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './container/app';
import './index.css'
import { HomeContextProvider } from './contextapi/HomeContextContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HomeContextProvider>
    <App />
  </HomeContextProvider>
);
