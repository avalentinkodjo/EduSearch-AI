import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, Brain, BookOpen, MessageSquare, LayoutDashboard,
  Menu, X, Sparkles, Bell, User, ChevronDown
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Recherche', icon: <Search size={18} /> },
    { to: '/assistant', label: 'Assistant IA', icon: <Brain size={18} /> },
    { to: '/courses', label: 'Cours', icon: <BookOpen size={18} /> },
    { to: '/forum', label: 'Forum', icon: <MessageSquare size={18} /> },
    { to: '/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <div className="navbar__logo-icon">
            <Sparkles size={22} />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">EduSearch</span>
            <span className="navbar__logo-badge">AI</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
              id={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__action-btn"
            onClick={() => setShowNotif(!showNotif)}
            id="navbar-notifications"
          >
            <Bell size={20} />
            <span className="navbar__notif-dot"></span>
          </button>

          <div className="navbar__profile" id="navbar-profile">
            <div className="navbar__avatar">
              <User size={18} />
            </div>
            <span className="navbar__username">Étudiant</span>
            <ChevronDown size={14} />
          </div>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            id="navbar-mobile-toggle"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="navbar__mobile animate-fade-in-down" id="navbar-mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
