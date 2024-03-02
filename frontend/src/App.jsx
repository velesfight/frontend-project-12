import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.jsx';
import MainPage from './Components/MainPage.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';
import AuthProvider from './Components/AuthProvider.js'
import { Provider } from 'react-redux';
import store from './Components/store.js'

const App = () => {
  return (
    <Provider store={store}>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  );
}

export default App;
