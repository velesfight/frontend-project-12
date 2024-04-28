import { useContext } from 'react';
import AuthContext from '../Components/contexts/index.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;
