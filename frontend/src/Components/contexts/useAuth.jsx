import { useContext } from 'react';
import AuthContext from './index.jsx';
import ApiContext from './ApiContext.jsx';


export const useSocket = () => useContext(ApiContext);


export const useAuth = () => useContext(AuthContext);
