import { useEffect } from 'react';
import {
  Search, Sparkles, Layers, BookOpen, PlayCircle,
  Code, MessageSquare, ArrowRight, Brain, Zap, Globe,
  TrendingUp, Users, Award, ChevronRight
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import { useSearch } from '../context/SearchContext';
import { categories, courses, userStats } from '../data/mockData';
import './SearchPage.css';

const iconMap = {
  layers: Layers,
  'book-open': BookOpen,
  'play-circle': PlayCircle,
  code: Code,
  'messages-square': MessageSquare,
};

export default function SearchPage() {
  const { results, hasSearched, isSearching, activeFilter, setActiveFilter, allResults } = useSearch();

  return (
    <div className="search-page" id="search-page">
      {/* Hero Section */}
      {!hasSearched && (
        <section className="hero" id="hero-section">
          {/* Background Effects */}
          <div className="hero__bg">
            <div className="hero__orb hero__orb--1"></div>
            <div className="hero__orb hero__orb--2"></div>
            <div className="hero__orb hero__orb--3"></div>
            <div className="hero__grid"></div>
          </div>

          <div className="container hero__content">
            <div className="hero__badge animate-fade-in-up">
              <Sparkles size={14} />
              <span>Propulsé par l'Intelligence Artificielle</span>
            </div>

            <h1 className="hero__title animate-fade-in-up delay-1">
              Trouvez n'importe quel concept
              <br />
              <span className="text-gradient">en un instant.</span>
            </h1>

            <p className="hero__subtitle animate-fade-in-up delay-2">
              Recherche sémantique intelligente : retrouvez cours, vidéos, exercices et
              discussions par <strong>sens et intention</strong>, pas par mots-clés exacts.
            </p>

            <div className="hero__search animate-fade-in-up delay-3">
              <SearchBar variant="hero" autoFocus />
            </div>

            {/* Stats */}
            <div className="hero__stats animate-fade-in-up delay-4">
              <div className="hero__stat">
                <BookOpen size={18} />
                <div>
                  <span className="hero__stat-value">142</span>
                  <span className="hero__stat-label">Cours</span>
                </div>
              </div>
              <div className="hero__stat">
                <PlayCircle size={18} />
                <div>
                  <span className="hero__stat-value">580+</span>
                  <span className="hero__stat-label">Vidéos</span>
                </div>
              </div>
              <div className="hero__stat">
                <Users size={18} />
                <div>
                  <span className="hero__stat-value">3.2k</span>
                  <span className="hero__stat-label">Étudiants</span>
                </div>
              </div>
              <div className="hero__stat">
                <Award size={18} />
                <div>
                  <span className="hero__stat-value">98%</span>
                  <span className="hero__stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="container">
            <div className="features" id="features-section">
              <div className="feature-card animate-fade-in-up delay-2">
                <div className="feature-card__icon feature-card__icon--purple">
                  <Brain size={24} />
                </div>
                <h3 className="feature-card__title">Recherche Sémantique</h3>
                <p className="feature-card__desc">
                  Comprenez le sens de votre question, pas juste les mots.
                  Trouvez des résultats pertinents même avec des formulations différentes.
                </p>
              </div>

              <div className="feature-card animate-fade-in-up delay-3">
                <div className="feature-card__icon feature-card__icon--cyan">
                  <Zap size={24} />
                </div>
                <h3 className="feature-card__title">Détection de Doublons</h3>
                <p className="feature-card__desc">
                  Avant de poster une question, découvrez les réponses déjà existantes.
                  Gagnez du temps et trouvez des solutions instantanément.
                </p>
              </div>

              <div className="feature-card animate-fade-in-up delay-4">
                <div className="feature-card__icon feature-card__icon--emerald">
                  <Globe size={24} />
                </div>
                <h3 className="feature-card__title">Recherche Transversale</h3>
                <p className="feature-card__desc">
                  Localisez la minute exacte d'une vidéo ou la section précise d'un cours
                  qui traite du concept recherché.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {hasSearched && (
        <section className="results-section" id="results-section">
          <div className="container">
            {/* Search bar (compact) */}
            <div className="results-section__search">
              <SearchBar variant="compact" />
            </div>

            {/* Filters */}
            <div className="results-section__filters" id="result-filters">
              {categories.map(cat => {
                const CatIcon = iconMap[cat.icon] || Layers;
                const count = cat.id === 'all'
                  ? allResults.length
                  : allResults.filter(r => r.type === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    className={`filter-btn ${activeFilter === cat.id ? 'filter-btn--active' : ''}`}
                    onClick={() => setActiveFilter(cat.id)}
                    id={`filter-${cat.id}`}
                  >
                    <CatIcon size={15} />
                    <span>{cat.name}</span>
                    <span className="filter-btn__count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Loading */}
            {isSearching && (
              <div className="results-section__loading">
                <div className="loading-skeleton">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton-card animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                      <div className="skeleton-line skeleton-line--sm"></div>
                      <div className="skeleton-line skeleton-line--lg"></div>
                      <div className="skeleton-line skeleton-line--md"></div>
                      <div className="skeleton-line skeleton-line--xs"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {!isSearching && results.length > 0 && (
              <div className="results-section__grid">
                <div className="results-section__info animate-fade-in">
                  <TrendingUp size={16} />
                  <span>
                    <strong>{results.length}</strong> résultats trouvés — triés par pertinence sémantique
                  </span>
                </div>

                <div className="results-list">
                  {results.map((result, i) => (
                    <ResultCard key={result.id} result={result} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty */}
            {!isSearching && hasSearched && results.length === 0 && (
              <div className="results-section__empty animate-fade-in-up">
                <Search size={48} />
                <h3>Aucun résultat trouvé</h3>
                <p>Essayez de reformuler votre recherche ou utilisez des termes plus généraux.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
