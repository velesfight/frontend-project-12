import React, { createContext, useCallback, ReactNode } from 'react';
import filter from 'leo-profanity';

export type FilterContextType = (word: string) => string;
export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const filterWord = useCallback((word: string) => filter.clean(word), []);

  return (
    <FilterContext.Provider value={filterWord}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
