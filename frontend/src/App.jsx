import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate,
  useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import MainPage from './Components/MainPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';
import AuthProvider from './Components/AuthProvider.js'
import { Provider } from 'react-redux';
import store from './Components/store.js'

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
    <Provider store={store}>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  );
}

export default App;
