import { useContext } from 'react';
import { FilterContext } from '../contexts/filterContext';

const useFilter = () => useContext(FilterContext);

export default useFilter;
