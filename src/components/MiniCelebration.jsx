import React, { useEffect, useState } from 'react';
import './MiniCelebration.css';

const MiniCelebration = ({ message, icon, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="mini-celebration">
      <div className="mini-celebration-content">
        <div className="mini-celebration-icon">{icon}</div>
        <div className="mini-celebration-message">{message}</div>
      </div>
      <div className="mini-confetti">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="mini-confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][
                Math.floor(Math.random() * 5)
              ],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniCelebration;
