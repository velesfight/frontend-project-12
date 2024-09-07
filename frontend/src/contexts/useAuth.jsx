import { useContext } from 'react';
import { AuthContext } from '../Components/AuthProvider';


export const useAuth = () => useContext(AuthContext);




