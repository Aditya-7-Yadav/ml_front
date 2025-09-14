import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import Info1 from './Info';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Main from './main';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/info1" element={<Info1 />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      </BrowserRouter>
  </React.StrictMode>
);


