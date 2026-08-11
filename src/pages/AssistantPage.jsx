import { useState, useRef, useEffect } from 'react';
import {
  Send, Brain, User, Sparkles, BookOpen, PlayCircle,
  Code, Loader2, Copy, Check, RotateCcw, ThumbsUp,
  ThumbsDown, Clock, ChevronRight, MessageSquare, Bot
} from 'lucide-react';
import { chatMessages as initialMessages } from '../data/mockData';
import './AssistantPage.css';

export default function AssistantPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: `m${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000));

    const assistantMessage = {
      id: `m${Date.now() + 1}`,
      role: 'assistant',
      content: `J'ai analysé votre question "${userMessage.content}" à travers notre base de connaissances. Voici ce que j'ai trouvé :

**Résumé :**
Cette question concerne un concept fondamental souvent abordé dans nos cours de niveau intermédiaire et avancé. La clé est de comprendre les principes sous-jacents avant de passer à l'implémentation.

**Points importants :**
1. Commencez par bien comprendre le contexte théorique
2. Consultez les ressources pratiques (TP et exercices)
3. N'hésitez pas à regarder les discussions du forum pour des cas concrets

📚 **3 ressources pertinentes** ont été identifiées dans notre base.`,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      sources: [
        { type: 'cours', title: 'Fondamentaux — Chapitre 5', page: 86 },
        { type: 'video', title: 'Tutoriel pratique détaillé', time: '06:42' },
        { type: 'exercice', title: 'TP Pratique Guidé' },
      ],
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatContent = (content) => {
    // Basic markdown parsing for display
    return content
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={i}>{line.replace(/\*\*/g, '')}</strong>;
        }
        // Bold inline
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <span key={i}>
              {parts.map((part, j) => (
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              ))}
            </span>
          );
        }
        // Code blocks
        if (line.startsWith('```')) return null;
        if (line === '') return <br key={i} />;
        return <span key={i}>{line}</span>;
      })
      .filter(Boolean);
  };

  const hasCodeBlock = (content) => content.includes('```');

  const extractCodeBlocks = (content) => {
    const blocks = [];
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;
    let lastIndex = 0;
    let parts = [];

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'code', language: match[1] || 'code', content: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.slice(lastIndex) });
    }
    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  const quickQuestions = [
    "Explique-moi les jointures SQL simplement",
    "Comment fonctionne le Virtual DOM en React ?",
    "Qu'est-ce qu'un index en base de données ?",
    "Les callbacks vs Promises en JavaScript",
  ];

  return (
    <div className="assistant-page" id="assistant-page">
      {/* Sidebar */}
      <aside className="assistant-sidebar" id="assistant-sidebar">
        <div className="assistant-sidebar__header">
          <Brain size={20} />
          <h2>Assistant IA</h2>
        </div>

        <div className="assistant-sidebar__section">
          <h3 className="assistant-sidebar__title">Questions rapides</h3>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              className="assistant-sidebar__quick-btn"
              onClick={() => {
                setInput(q);
                inputRef.current?.focus();
              }}
            >
              <MessageSquare size={14} />
              <span>{q}</span>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>

        <div className="assistant-sidebar__section">
          <h3 className="assistant-sidebar__title">Capacités</h3>
          <div className="assistant-sidebar__capabilities">
            <div className="capability">
              <Sparkles size={14} />
              <span>Recherche sémantique dans les cours</span>
            </div>
            <div className="capability">
              <PlayCircle size={14} />
              <span>Localisation de moments dans les vidéos</span>
            </div>
            <div className="capability">
              <Code size={14} />
              <span>Explication de code avec exemples</span>
            </div>
            <div className="capability">
              <BookOpen size={14} />
              <span>Adaptation au niveau de compréhension</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="assistant-chat" id="assistant-chat">
        {/* Messages */}
        <div className="assistant-chat__messages">
          {/* Welcome */}
          {messages.length === 0 && (
            <div className="assistant-welcome animate-fade-in-up">
              <div className="assistant-welcome__icon">
                <Bot size={40} />
              </div>
              <h2>Bienvenue sur l'Assistant IA</h2>
              <p>
                Posez n'importe quelle question sur vos cours. Je retrouverai les ressources
                pertinentes et vous fournirai une réponse personnalisée.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message chat-message--${msg.role} animate-fade-in-up`}
              id={`message-${msg.id}`}
            >
              <div className="chat-message__avatar">
                {msg.role === 'user' ? (
                  <User size={18} />
                ) : (
                  <Sparkles size={18} />
                )}
              </div>

              <div className="chat-message__body">
                <div className="chat-message__header">
                  <span className="chat-message__name">
                    {msg.role === 'user' ? 'Vous' : 'EduSearch AI'}
                  </span>
                  <span className="chat-message__time">
                    <Clock size={12} />
                    {msg.timestamp}
                  </span>
                </div>

                <div className="chat-message__content">
                  {extractCodeBlocks(msg.content).map((part, i) => (
                    part.type === 'code' ? (
                      <div key={i} className="chat-code-block">
                        <div className="chat-code-block__header">
                          <span>{part.language.toUpperCase()}</span>
                          <button
                            onClick={() => handleCopy(part.content, `${msg.id}-${i}`)}
                          >
                            {copiedId === `${msg.id}-${i}` ? <Check size={14} /> : <Copy size={14} />}
                            {copiedId === `${msg.id}-${i}` ? 'Copié' : 'Copier'}
                          </button>
                        </div>
                        <pre><code>{part.content}</code></pre>
                      </div>
                    ) : (
                      <div key={i} className="chat-text-block">
                        {formatContent(part.content)}
                      </div>
                    )
                  ))}
                </div>

                {/* Sources */}
                {msg.sources && (
                  <div className="chat-message__sources">
                    <h4>
                      <BookOpen size={14} />
                      Sources
                    </h4>
                    <div className="chat-sources-list">
                      {msg.sources.map((src, i) => (
                        <button key={i} className="chat-source-btn">
                          {src.type === 'video' && <PlayCircle size={14} />}
                          {src.type === 'cours' && <BookOpen size={14} />}
                          {src.type === 'exercice' && <Code size={14} />}
                          <span>{src.title}</span>
                          {src.time && <span className="chat-source-time">à {src.time}</span>}
                          {src.page && <span className="chat-source-time">p.{src.page}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions for assistant messages */}
                {msg.role === 'assistant' && (
                  <div className="chat-message__actions">
                    <button className="chat-action-btn" title="Utile">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="chat-action-btn" title="Pas utile">
                      <ThumbsDown size={14} />
                    </button>
                    <button
                      className="chat-action-btn"
                      title="Copier"
                      onClick={() => handleCopy(msg.content, msg.id)}
                    >
                      {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <button className="chat-action-btn" title="Régénérer">
                      <RotateCcw size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-message chat-message--assistant animate-fade-in-up">
              <div className="chat-message__avatar">
                <Sparkles size={18} />
              </div>
              <div className="chat-message__body">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="assistant-chat__input-wrapper" id="assistant-input">
          <form className="assistant-chat__form" onSubmit={handleSubmit}>
            <div className="assistant-chat__input-container">
              <input
                ref={inputRef}
                type="text"
                className="assistant-chat__input"
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                id="assistant-text-input"
              />
              <button
                type="submit"
                className="assistant-chat__send btn btn--primary"
                disabled={!input.trim() || isTyping}
                id="assistant-send-btn"
              >
                {isTyping ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
              </button>
            </div>
            <p className="assistant-chat__disclaimer">
              L'assistant utilise la recherche sémantique pour retrouver les ressources pertinentes dans vos cours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
