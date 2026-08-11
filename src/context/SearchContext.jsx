import { createContext, useContext, useState, useCallback } from 'react';
import { searchResults as mockResults, recentSearches as mockRecent } from '../data/mockData';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState(mockRecent);
  const [activeFilter, setActiveFilter] = useState('all');
  const [comprehensionLevel, setComprehensionLevel] = useState('normal');

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setIsSearching(true);
    setHasSearched(true);

    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 5);
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Filter mock results based on query relevance
    setResults(mockResults);
    setIsSearching(false);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setIsSearching(false);
  }, []);

  const filteredResults = activeFilter === 'all'
    ? results
    : results.filter(r => r.type === activeFilter);

  return (
    <SearchContext.Provider value={{
      query,
      setQuery,
      results: filteredResults,
      allResults: results,
      isSearching,
      hasSearched,
      recentSearches,
      activeFilter,
      setActiveFilter,
      comprehensionLevel,
      setComprehensionLevel,
      performSearch,
      clearSearch,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
