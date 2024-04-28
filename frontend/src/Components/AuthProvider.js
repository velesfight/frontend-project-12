import { useState } from 'react';
import AuthContext from '../Components/contexts/index.jsx';

const AuthProvider = ({ children }) => {
const [loggedIn, setLoggedIn] = useState(false);

const logIn = (userData) => {
  localStorage.setItem('userId', JSON.stringify(userData));
  setLoggedIn(true);
};
const logOut = () => {
  localStorage.removeItem('userId');
  setLoggedIn(false);
};

const getToken = () => {
  if (loggedIn) {
    return user.token;
  }
  return null;
};
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
