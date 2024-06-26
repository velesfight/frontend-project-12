import { useContext } from 'react';
import ApiContext from './ApiContext.jsx';


export const useSocket = () => useContext(ApiContext);


