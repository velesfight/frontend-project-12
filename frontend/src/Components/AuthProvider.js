import { createContext, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem('userId'));
console.log(savedUser)
  const [user, setUser] = useState(
    savedUser ? { username: savedUser.username } : null,
  );

  const getAuthToken = () => savedUser?.token || null;
  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const contextValue = {
    logIn,
    logOut,
    user,
    getAuthToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;