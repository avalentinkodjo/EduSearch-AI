import {
  LayoutDashboard, BookOpen, Clock, Flame, Search,
  TrendingUp, Award, ChevronRight, BarChart3,
  Activity, Target, Zap
} from 'lucide-react';
import { userStats, courses, activityFeed, recentSearches } from '../data/mockData';
import './DashboardPage.css';

export default function DashboardPage() {
  const enrolledCourses = courses.filter(c => c.progress > 0);

  return (
    <div className="dashboard-page" id="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header animate-fade-in-up">
          <div className="dashboard-header__greeting">
            <h1>Bon retour 👋</h1>
            <p>Voici un résumé de votre activité d'apprentissage.</p>
          </div>
          <div className="dashboard-header__streak">
            <Flame size={20} />
            <div>
              <span className="dashboard-header__streak-count">{userStats.streak}</span>
              <span className="dashboard-header__streak-label">jours consécutifs</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-stats animate-fade-in-up delay-1" id="dashboard-stats">
          <div className="stat-card stat-card--purple">
            <div className="stat-card__icon">
              <BookOpen size={22} />
            </div>
            <div className="stat-card__data">
              <span className="stat-card__value">{userStats.coursesEnrolled}</span>
              <span className="stat-card__label">Cours inscrits</span>
            </div>
            <div className="stat-card__trend stat-card__trend--up">
              <TrendingUp size={14} />
              <span>+1 ce mois</span>
            </div>
          </div>

          <div className="stat-card stat-card--cyan">
            <div className="stat-card__icon">
              <Award size={22} />
            </div>
            <div className="stat-card__data">
              <span className="stat-card__value">{userStats.coursesCompleted}</span>
              <span className="stat-card__label">Cours terminés</span>
            </div>
            <div className="stat-card__trend stat-card__trend--up">
              <TrendingUp size={14} />
              <span>+1 ce mois</span>
            </div>
          </div>

          <div className="stat-card stat-card--emerald">
            <div className="stat-card__icon">
              <Clock size={22} />
            </div>
            <div className="stat-card__data">
              <span className="stat-card__value">{userStats.hoursLearned}h</span>
              <span className="stat-card__label">Heures d'étude</span>
            </div>
            <div className="stat-card__trend stat-card__trend--up">
              <TrendingUp size={14} />
              <span>+8h cette semaine</span>
            </div>
          </div>

          <div className="stat-card stat-card--amber">
            <div className="stat-card__icon">
              <Search size={22} />
            </div>
            <div className="stat-card__data">
              <span className="stat-card__value">{userStats.searchesThisWeek}</span>
              <span className="stat-card__label">Recherches cette semaine</span>
            </div>
            <div className="stat-card__trend stat-card__trend--up">
              <TrendingUp size={14} />
              <span>+12%</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Left: Courses Progress */}
          <div className="dashboard-section animate-fade-in-up delay-2">
            <div className="dashboard-section__header">
              <h2>
                <Target size={18} />
                Progression des cours
              </h2>
              <button className="btn btn--ghost btn--sm">
                Voir tout <ChevronRight size={14} />
              </button>
            </div>

            <div className="dashboard-courses-progress" id="courses-progress">
              {enrolledCourses.map((course, i) => (
                <div
                  key={course.id}
                  className="progress-card animate-fade-in-up"
                  style={{ animationDelay: `${(i + 3) * 100}ms` }}
                >
                  <div className="progress-card__header">
                    <div className="progress-card__icon">
                      <BookOpen size={16} />
                    </div>
                    <div className="progress-card__info">
                      <h4>{course.title}</h4>
                      <span>{course.instructor}</span>
                    </div>
                    <span className="progress-card__percent">{course.progress}%</span>
                  </div>
                  <div className="progress-card__bar">
                    <div
                      className="progress-card__fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-card__meta">
                    <span>Module {Math.ceil(course.modules * course.progress / 100)}/{course.modules}</span>
                    <span>{course.duration} restantes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Activity & Topics */}
          <div className="dashboard-right">
            {/* Activity Feed */}
            <div className="dashboard-section animate-fade-in-up delay-3">
              <div className="dashboard-section__header">
                <h2>
                  <Activity size={18} />
                  Activité récente
                </h2>
              </div>

              <div className="activity-feed" id="activity-feed">
                {activityFeed.map((item, i) => (
                  <div
                    key={item.id}
                    className="activity-item animate-fade-in-up"
                    style={{ animationDelay: `${(i + 4) * 80}ms` }}
                  >
                    <div className="activity-item__dot"></div>
                    <div className="activity-item__content">
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Topics */}
            <div className="dashboard-section animate-fade-in-up delay-4">
              <div className="dashboard-section__header">
                <h2>
                  <Zap size={18} />
                  Sujets favoris
                </h2>
              </div>

              <div className="topics-cloud" id="topics-cloud">
                {userStats.topTopics.map((topic, i) => (
                  <span key={topic} className="topic-tag" style={{ animationDelay: `${i * 100}ms` }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="dashboard-section animate-fade-in-up delay-5">
              <div className="dashboard-section__header">
                <h2>
                  <Search size={18} />
                  Recherches récentes
                </h2>
              </div>

              <div className="recent-searches-list" id="recent-searches-dashboard">
                {recentSearches.map((search, i) => (
                  <div key={i} className="recent-search-item">
                    <Search size={14} />
                    <span>{search}</span>
                    <ChevronRight size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
