import {
  PlayCircle, BookOpen, Code, MessageSquare,
  Clock, Star, ExternalLink, CheckCircle2, ChevronRight
} from 'lucide-react';
import './ResultCard.css';

const typeConfig = {
  video: { icon: PlayCircle, label: 'Vidéo', colorClass: 'result-card--video' },
  cours: { icon: BookOpen, label: 'Cours', colorClass: 'result-card--cours' },
  exercice: { icon: Code, label: 'Exercice', colorClass: 'result-card--exercice' },
  forum: { icon: MessageSquare, label: 'Forum', colorClass: 'result-card--forum' },
};

export default function ResultCard({ result, index = 0 }) {
  const config = typeConfig[result.type] || typeConfig.cours;
  const TypeIcon = config.icon;

  return (
    <article
      className={`result-card ${config.colorClass} animate-fade-in-up`}
      style={{ animationDelay: `${index * 80}ms` }}
      id={`result-card-${result.id}`}
    >
      <div className="result-card__header">
        <div className="result-card__type-badge">
          <TypeIcon size={14} />
          <span>{config.label}</span>
        </div>

        <div className="result-card__relevance">
          <Star size={12} />
          <span>{Math.round(result.relevance * 100)}%</span>
        </div>
      </div>

      <h3 className="result-card__title">
        {result.title}
      </h3>

      <p className="result-card__description">
        {result.description}
      </p>

      {/* Code Snippet */}
      {result.snippet && (
        <div className="result-card__code">
          <pre><code>{result.snippet}</code></pre>
        </div>
      )}

      {/* Metadata */}
      <div className="result-card__meta">
        <span className="result-card__course-name">
          <BookOpen size={13} />
          {result.course}
        </span>

        {result.type === 'video' && result.timestamp && (
          <span className="result-card__timestamp">
            <Clock size={13} />
            à {result.timestamp} / {result.duration}
          </span>
        )}

        {result.type === 'cours' && result.chapter && (
          <span className="result-card__chapter">
            <BookOpen size={13} />
            {result.chapter} — p.{result.page}
          </span>
        )}

        {result.type === 'exercice' && (
          <>
            <span className="result-card__difficulty">
              <Code size={13} />
              {result.difficulty}
            </span>
            <span className="result-card__time">
              <Clock size={13} />
              {result.estimatedTime}
            </span>
          </>
        )}

        {result.type === 'forum' && (
          <>
            <span className="result-card__author">@{result.author}</span>
            <span className="result-card__answers">
              <MessageSquare size={13} />
              {result.answers} réponses
            </span>
            {result.solved && (
              <span className="result-card__solved">
                <CheckCircle2 size={13} />
                Résolu
              </span>
            )}
          </>
        )}
      </div>

      <button className="result-card__action" id={`result-action-${result.id}`}>
        <span>Voir la ressource</span>
        <ChevronRight size={16} />
      </button>
    </article>
  );
}
