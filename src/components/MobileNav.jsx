import React, { useState } from 'react';
import './MobileNav.css';

const MobileNav = ({ onNavigate, currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'transactions', icon: '⚡', label: 'Transactions' },
    { id: 'income', icon: '💰', label: 'Income' },
    { id: 'expenses', icon: '💳', label: 'Expenses' },
    { id: 'goals', icon: '🎯', label: 'Goals' },
    { id: 'ideas', icon: '💡', label: 'Income Ideas' },
    { id: 'fitness', icon: '💪', label: 'Fitness' },
    { id: 'learning', icon: '📚', label: 'Learning' },
    { id: 'achievements', icon: '🏆', label: 'Achievements' },
    { id: 'reports', icon: '📄', label: 'Reports' },
  ];

  const handleNavigate = (sectionId) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className={`burger-menu ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="mobile-header-title">
          <span className="mobile-logo">💰</span>
          <span>Finance Tracker</span>
        </div>
        <div className="mobile-header-spacer"></div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="mobile-nav-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="mobile-nav-logo">
            <span className="nav-logo-icon">💰</span>
            <div className="nav-logo-text">
              <div className="nav-logo-title">Finance Dashboard</div>
              <div className="nav-logo-subtitle">Track. Save. Grow.</div>
            </div>
          </div>
          <button 
            className="mobile-nav-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-nav-items">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-item ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigate(item.id)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-label">{item.label}</span>
              {currentSection === item.id && (
                <span className="nav-item-indicator">●</span>
              )}
            </button>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <div className="nav-footer-text">
            Made with ❤️ for your financial freedom
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
