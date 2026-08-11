import { useState } from 'react';
import {
  BookOpen, Clock, Star, Users, Search, Filter,
  ChevronRight, Play, BarChart3, Layers
} from 'lucide-react';
import { courses } from '../data/mockData';
import './CoursesPage.css';

const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
const categoriesList = ['Tous', 'Base de données', 'Développement Web', 'Intelligence Artificielle', 'Cloud Computing', 'Cybersécurité'];

export default function CoursesPage() {
  const [searchFilter, setSearchFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('Tous');
  const [categoryFilter, setCategoryFilter] = useState('Tous');

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchLevel = levelFilter === 'Tous' || c.level === levelFilter;
    const matchCat = categoryFilter === 'Tous' || c.category === categoryFilter;
    return matchSearch && matchLevel && matchCat;
  });

  const getLevelColor = (level) => {
    switch(level) {
      case 'Débutant': return 'badge--success';
      case 'Intermédiaire': return 'badge--warning';
      case 'Avancé': return 'badge--primary';
      default: return 'badge--primary';
    }
  };

  return (
    <div className="courses-page" id="courses-page">
      <div className="container">
        {/* Header */}
        <div className="courses-header animate-fade-in-up">
          <div className="courses-header__text">
            <h1>
              <BookOpen size={32} />
              Catalogue des <span className="text-gradient">Cours</span>
            </h1>
            <p>Explorez notre collection de cours et trouvez votre prochain apprentissage.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="courses-filters animate-fade-in-up delay-1" id="courses-filters">
          <div className="courses-filters__search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Filtrer par nom ou tag..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              id="courses-search-input"
            />
          </div>

          <div className="courses-filters__select-group">
            <div className="courses-filters__select">
              <Layers size={15} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                id="courses-category-filter"
              >
                {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="courses-filters__select">
              <BarChart3 size={15} />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                id="courses-level-filter"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="courses-count animate-fade-in delay-2">
          {filtered.length} cours trouvé{filtered.length > 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="courses-grid" id="courses-grid">
          {filtered.map((course, i) => (
            <article
              key={course.id}
              className="course-card animate-fade-in-up"
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
              id={`course-card-${course.id}`}
            >
              {/* Thumbnail */}
              <div className="course-card__thumbnail">
                <div className="course-card__thumbnail-gradient">
                  <BookOpen size={32} />
                </div>
                <span className={`badge ${getLevelColor(course.level)} course-card__level`}>
                  {course.level}
                </span>
                {course.progress > 0 && (
                  <div className="course-card__progress-bar">
                    <div
                      className="course-card__progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="course-card__body">
                <div className="course-card__category">{course.category}</div>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.description}</p>

                {/* Tags */}
                <div className="course-card__tags">
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="course-card__tag">{tag}</span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="course-card__tag course-card__tag--more">
                      +{course.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="course-card__meta">
                  <span>
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span>
                    <Play size={14} />
                    {course.modules} modules
                  </span>
                  <span>
                    <Star size={14} />
                    {course.rating}
                  </span>
                  <span>
                    <Users size={14} />
                    {course.students.toLocaleString()}
                  </span>
                </div>

                {/* Instructor */}
                <div className="course-card__footer">
                  <div className="course-card__instructor">
                    <div className="course-card__instructor-avatar">
                      {course.instructor.charAt(0)}
                    </div>
                    <span>{course.instructor}</span>
                  </div>
                  <button className="btn btn--primary btn--sm" id={`course-action-${course.id}`}>
                    {course.progress > 0 ? 'Continuer' : 'Découvrir'}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="courses-empty animate-fade-in-up">
            <Search size={48} />
            <h3>Aucun cours trouvé</h3>
            <p>Modifiez vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </div>
    </div>
  );
}
