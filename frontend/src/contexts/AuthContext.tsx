import {
  createContext, useState, useMemo, useCallback, ReactNode
} from 'react';

interface User {
  username: string;
  token?: string;
}
export interface AuthContextType {
  user: User | null;
  getAuthToken: () => string | null;
  logIn: (userData: User & { token: string }) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem('userId') || 'null');
  const [user, setUser] = useState<User | null>(
    savedUser ? { username: savedUser.username, token: savedUser.token } : null,
  );


  const getAuthToken = useCallback(() => (
    savedUser ? savedUser.token : null
  ), [savedUser]);

  const logIn = useCallback((userData: User & { token: string }) => {
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
