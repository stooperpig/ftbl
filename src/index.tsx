import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Charts from './pages/charts';
import store from './constants/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}/>
              <Route path="charts" element={<Charts />} />
          </Routes>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);