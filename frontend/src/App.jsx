import './App.css';
import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import useAuth from './contexts/useAuth';
import MainPage from './Components/MainPage.jsx';
import LoginPage from './Components/LoginPage/LoginPage';
import NotFoundPage from './Components/NotFoundPage.jsx';
import AuthProvider from './Components/AuthProvider.js';
import SignUp from './Components/SignUpPage/SignUp';
import store from './Components/store.js';
import routes from './Components/routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import HeaderChat from './Components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? children : (
      <Navigate to={routes.loginPath()} state={{ from: location }} />
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
                  path={routes.signUpPath()}
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
