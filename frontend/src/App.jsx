import './App.css';
import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import useAuth from './hooks/useAuth.ts';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthProvider from './contexts/AuthContext.js';
import SignUp from './pages/SignUp';
import store from './store';
import appRoutes from './routes/appRoutes';
import apiRoutes from './routes/apiRoutes';
import 'react-toastify/dist/ReactToastify.css';
import HeaderChat from './pages/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? children : (
      <Navigate to={apiRoutes.loginPath()} state={{ from: location }} />
    )
  );
};
// eslint-disable-next-line arrow-body-style
const App = () => {
  return (
    <div className="h-100" id="chat">
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <div className="d-flex flex-column h-100">
              <HeaderChat />
              <Routes>
                <Route
                  path={appRoutes.chatPage()}
                  element={(
                    <PrivateRoute>
                      <MainPage />
                    </PrivateRoute>
                  )}
                />
                <Route
                  path={apiRoutes.loginPath()}
                  element={<LoginPage />}
                />
                <Route
                  path={apiRoutes.signUpPath()}
                  element={<SignUp />}
                />
                <Route
                  path="*"
                  element={<NotFoundPage />}
                />
              </Routes>
              <ToastContainer position="top-center" />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </div>
  );
};

export default App;
