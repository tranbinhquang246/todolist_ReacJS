import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signin from './components/signin/Signin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
    </Routes>
  </BrowserRouter>
);
