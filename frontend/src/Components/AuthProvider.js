import { useState } from 'react';
import { AuthContext } from '../contexts/useAuth'

const AuthProvider = ({ children }) => {
    const saveToken = (token) => {
      const userId = JSON.parse(token);
      localStorage.setItem('userId', JSON.stringify(userId));
      console.log(userId.token)
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
};


  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, saveToken }}>
      {children}
    </AuthContext.Provider>
  );

};


export default AuthProvider;
