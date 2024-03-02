import { useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
const [loggedIn, setLoggedIn] = useState(false);
const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
