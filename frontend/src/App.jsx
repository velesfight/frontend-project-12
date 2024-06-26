import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate,
  useLocation } from 'react-router-dom';
import  { useAuth }  from './contexts/useAuth'
import MainPage from './Components/MainPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';
import AuthProvider from './Components/AuthProvider.js'
import { Provider } from 'react-redux';
import store from './Components/store.js'
import routes from './Components/routes';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : (
    <Navigate to={routes.loginPath()} state={{ from: location }} />
    )
  );
};

const App = () => {
  return (
    <Provider store={store}>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route
            path={routes.chatPage()}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route
          path={routes.loginPath()}
          element={<LoginPage />}
          />
        <Route
        path="*" element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  );
}

export default App;
