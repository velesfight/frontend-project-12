import {
  createContext, useState, useMemo, useCallback,
} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(
    savedUser ? { username: savedUser.username } : null,
  );

  const getAuthToken = useCallback(() => (
    savedUser ? savedUser.token : null
  ), [savedUser]);

  const logIn = useCallback((userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const contextValue = useMemo(() => ({
    logIn,
    logOut,
    user,
    getAuthToken,
  }), [user, logIn, logOut, getAuthToken]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
