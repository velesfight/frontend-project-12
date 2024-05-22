import { useContext } from 'react';
import AuthContext from '../Components/contexts/index.jsx';
import { ApiProvider } from './init.jsx';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(ApiProvider);

