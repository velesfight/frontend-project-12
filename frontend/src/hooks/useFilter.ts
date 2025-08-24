import { useContext } from 'react';
import { FilterContext, FilterContextType } from '../contexts/filterContext';

const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export default useFilter;
