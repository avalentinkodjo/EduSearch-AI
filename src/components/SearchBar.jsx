import { useState, useRef, useEffect } from 'react';
import {
  Search, Sparkles, ArrowRight, X, Clock, TrendingUp,
  Zap, BookOpen, Cloud, Brain, Shield, Loader2, Baby
} from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { suggestedSearches } from '../data/mockData';
import './SearchBar.css';

const iconMap = {
  sparkles: Sparkles,
  zap: Zap,
  book: BookOpen,
  cloud: Cloud,
  brain: Brain,
  shield: Shield,
};

export default function SearchBar({ variant = 'hero', autoFocus = false }) {
  const {
    query, setQuery, performSearch, recentSearches,
    comprehensionLevel, setComprehensionLevel, isSearching, clearSearch
  } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      performSearch(localQuery.trim());
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setLocalQuery(text);
    performSearch(text);
    setIsFocused(false);
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={`searchbar searchbar--${variant} ${isFocused ? 'searchbar--focused' : ''}`}
      ref={containerRef}
      id="search-bar-container"
    >
      <form className="searchbar__form" onSubmit={handleSubmit}>
        <div className="searchbar__input-wrapper">
          <div className="searchbar__icon">
            {isSearching ? (
              <Loader2 size={isHero ? 22 : 18} className="searchbar__spinner" />
            ) : (
              <Search size={isHero ? 22 : 18} />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            className="searchbar__input"
            placeholder="Rechercher un concept, un cours, ou poser une question..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            id="search-input"
          />

          {localQuery && (
            <button
              type="button"
              className="searchbar__clear"
              onClick={() => {
                setLocalQuery('');
                clearSearch();
                inputRef.current?.focus();
              }}
              id="search-clear-btn"
            >
              <X size={16} />
            </button>
          )}

          {/* Comprehension Level Toggle */}
          <div className="searchbar__level-toggle" id="comprehension-level-toggle">
            <button
              type="button"
              className={`searchbar__level-btn ${comprehensionLevel === 'simple' ? 'searchbar__level-btn--active' : ''}`}
              onClick={() => setComprehensionLevel(comprehensionLevel === 'simple' ? 'normal' : 'simple')}
              title="Explique-moi comme si j'avais 10 ans"
            >
              <Baby size={16} />
              <span>Simple</span>
            </button>
          </div>

          <button
            type="submit"
            className="searchbar__submit btn btn--primary"
            disabled={!localQuery.trim() || isSearching}
            id="search-submit-btn"
          >
            <Sparkles size={16} />
            <span>Rechercher</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {isFocused && !isSearching && (
        <div className="searchbar__dropdown animate-fade-in-down" id="search-dropdown">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="searchbar__section">
              <div className="searchbar__section-header">
                <Clock size={14} />
                <span>Recherches récentes</span>
              </div>
              {recentSearches.map((search, i) => (
                <button
                  key={i}
                  className="searchbar__dropdown-item"
                  onClick={() => handleSuggestionClick(search)}
                >
                  <Clock size={14} />
                  <span>{search}</span>
                  <ArrowRight size={14} className="searchbar__item-arrow" />
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          <div className="searchbar__section">
            <div className="searchbar__section-header">
              <TrendingUp size={14} />
              <span>Suggestions populaires</span>
            </div>
            {suggestedSearches.map((suggestion, i) => {
              const SuggIcon = iconMap[suggestion.icon] || Sparkles;
              return (
                <button
                  key={i}
                  className="searchbar__dropdown-item"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <SuggIcon size={14} />
                  <span>{suggestion.text}</span>
                  <ArrowRight size={14} className="searchbar__item-arrow" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
