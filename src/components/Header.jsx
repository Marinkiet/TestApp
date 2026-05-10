import React from 'react';
import './Header.css';

const Header = () => {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-ZA', options);

  return (
    <header className="header">
      <h1>💰 Financial Dashboard</h1>
      <div className="date-display">{dateString}</div>
    </header>
  );
};

export default Header;
