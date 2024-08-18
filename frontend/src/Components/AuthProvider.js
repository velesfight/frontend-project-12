import { useState } from 'react';
import { AuthContext } from './contexts/useAuth'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('userId');
    return token ? JSON.parse(token) : null;
  });
    const saveToken = (token) => {
      const userId = JSON.parse(token);
      localStorage.setItem('userId', JSON.stringify(userId));
      setUser(userId);
    };

const [loggedIn, setLoggedIn] = useState(() => {
  const token = localStorage.getItem('userId');
  console.log(!!token)//true
  return !!token;  // Приводим значение к булевому типу
});



const logIn = () =>
setLoggedIn(true);


const logOut = () => {
  localStorage.removeItem('userId');
  setLoggedIn(false);
  setUser(null)
};


  return (
    <AuthContext.Provider value={{ loggedIn, user, logIn, logOut, saveToken }}>
      {children}
    </AuthContext.Provider>
  );

};


export default AuthProvider;
