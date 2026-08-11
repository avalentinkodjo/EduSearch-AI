import { useState } from 'react';
import {
  MessageSquare, ThumbsUp, Eye, CheckCircle2, Clock,
  Search, Plus, ArrowUpRight, Sparkles, AlertCircle,
  ChevronRight, Filter
} from 'lucide-react';
import { forumQuestions, similarQuestions } from '../data/mockData';
import './ForumPage.css';

export default function ForumPage() {
  const [newQuestion, setNewQuestion] = useState('');
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleQuestionInput = (e) => {
    const value = e.target.value;
    setNewQuestion(value);
    setShowDuplicates(value.length > 15);
  };

  const filtered = filter === 'all'
    ? forumQuestions
    : filter === 'solved'
      ? forumQuestions.filter(q => q.solved)
      : forumQuestions.filter(q => !q.solved);

  return (
    <div className="forum-page" id="forum-page">
      <div className="container">
        {/* Header */}
        <div className="forum-header animate-fade-in-up">
          <h1>
            <MessageSquare size={32} />
            Forum <span className="text-gradient">Communautaire</span>
          </h1>
          <p>Posez vos questions, partagez vos connaissances et aidez la communauté.</p>
        </div>

        {/* New Question with Duplicate Detection */}
        <div className="forum-new-question animate-fade-in-up delay-1" id="new-question-section">
          <div className="forum-new-question__header">
            <Plus size={18} />
            <h2>Poser une nouvelle question</h2>
          </div>

          <div className="forum-new-question__input-wrapper">
            <textarea
              className="forum-new-question__input"
              placeholder="Décrivez votre problème ou votre question..."
              value={newQuestion}
              onChange={handleQuestionInput}
              rows={3}
              id="new-question-input"
            />
          </div>

          {/* Duplicate Detection */}
          {showDuplicates && (
            <div className="forum-duplicates animate-scale-in" id="duplicate-detection">
              <div className="forum-duplicates__header">
                <div className="forum-duplicates__icon">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3>Questions similaires détectées</h3>
                  <p>Ces questions existantes pourraient répondre à votre problème :</p>
                </div>
              </div>

              <div className="forum-duplicates__list">
                {similarQuestions.map((sq, i) => (
                  <div
                    key={sq.id}
                    className="forum-duplicate-item animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="forum-duplicate-item__main">
                      <div className="forum-duplicate-item__similarity">
                        <span>{Math.round(sq.similarity * 100)}%</span>
                      </div>
                      <div className="forum-duplicate-item__content">
                        <h4>{sq.title}</h4>
                        <div className="forum-duplicate-item__meta">
                          <span>
                            <MessageSquare size={12} />
                            {sq.answers} réponses
                          </span>
                          {sq.solved && (
                            <span className="forum-duplicate-item__solved">
                              <CheckCircle2 size={12} />
                              Résolu
                            </span>
                          )}
                          <span>
                            <Clock size={12} />
                            {sq.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="forum-duplicate-item__action">
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="forum-duplicates__footer">
                <AlertCircle size={14} />
                <span>Aucune de ces questions ne résout votre problème ?</span>
                <button className="btn btn--primary btn--sm" id="post-question-btn">
                  Publier quand même
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {!showDuplicates && newQuestion.length > 0 && (
            <button className="btn btn--primary" id="submit-question-btn">
              <Plus size={16} />
              Publier la question
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="forum-filters animate-fade-in-up delay-2" id="forum-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Toutes ({forumQuestions.length})
          </button>
          <button
            className={`filter-btn ${filter === 'solved' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('solved')}
          >
            <CheckCircle2 size={14} />
            Résolues
          </button>
          <button
            className={`filter-btn ${filter === 'unsolved' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('unsolved')}
          >
            <AlertCircle size={14} />
            Non résolues
          </button>
        </div>

        {/* Questions List */}
        <div className="forum-questions" id="questions-list">
          {filtered.map((q, i) => (
            <article
              key={q.id}
              className="forum-question animate-fade-in-up"
              style={{ animationDelay: `${(i + 3) * 80}ms` }}
              id={`question-${q.id}`}
            >
              {/* Votes */}
              <div className="forum-question__votes">
                <button className="forum-question__vote-btn">
                  <ThumbsUp size={16} />
                </button>
                <span className="forum-question__vote-count">{q.votes}</span>
              </div>

              {/* Content */}
              <div className="forum-question__body">
                <div className="forum-question__header">
                  <h3 className="forum-question__title">
                    {q.solved && <CheckCircle2 size={16} className="forum-question__solved-icon" />}
                    {q.title}
                  </h3>
                </div>

                <div className="forum-question__tags">
                  {q.tags.map(tag => (
                    <span key={tag} className="course-card__tag">{tag}</span>
                  ))}
                </div>

                <div className="forum-question__meta">
                  <span className="forum-question__author">
                    <div className="forum-question__author-avatar">
                      {q.author.charAt(0)}
                    </div>
                    {q.author}
                  </span>
                  <span>
                    <Clock size={13} />
                    {q.date}
                  </span>
                  <span>
                    <MessageSquare size={13} />
                    {q.answers} réponses
                  </span>
                  <span>
                    <Eye size={13} />
                    {q.views} vues
                  </span>
                </div>

                <div className="forum-question__course">
                  📚 {q.course}
                </div>
              </div>

              <button className="forum-question__action">
                <ChevronRight size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
