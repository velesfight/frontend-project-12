import { useContext } from 'react';
import { AuthContext } from '../Components/AuthProvider';

const useAuth = () => useContext(AuthContext);
export default useAuth;
