import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate,
  useLocation } from 'react-router-dom';
import  { useAuth }  from './contexts/useAuth'
import MainPage from './Components/MainPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import NotFoundPage from './Components/NotFoundPage.jsx';
import AuthProvider from './Components/AuthProvider.js'
import SignUp from './Components/SignUp';
import { Provider } from 'react-redux';
import store from './Components/store.js'
import routes from './Components/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          path={routes.signUpPath()} 
          element={<SignUp />} 
          />
        <Route
        path="*" element={<NotFoundPage />}
        />
        </Routes>
        <ToastContainer position='top-center' />
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  );
}

export default App;
