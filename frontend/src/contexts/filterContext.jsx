import React, { createContext, useCallback } from 'react';
import filter from 'leo-profanity';

export const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
  const filterWord = useCallback((word) => filter.clean(word), []);

  return (
    <FilterContext.Provider value={filterWord}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterProvider;
