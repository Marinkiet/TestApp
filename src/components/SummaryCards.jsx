import React from 'react';
import './SummaryCards.css';

const SummaryCards = ({ totalIncome, totalExpenses, netBalance, debtRemaining }) => {
  return (
    <div className="summary-grid">
      <div className="summary-card income-card">
        <h3>Monthly Income</h3>
        <div className="amount">R {totalIncome.toLocaleString()}</div>
        <div className="subtitle">Total earnings</div>
      </div>

      <div className="summary-card expense-card">
        <h3>Monthly Expenses</h3>
        <div className="amount">R {totalExpenses.toLocaleString()}</div>
        <div className="subtitle">Total spending</div>
      </div>

      <div className={`summary-card balance-card ${netBalance >= 0 ? 'positive' : 'negative'}`}>
        <h3>Net Balance</h3>
        <div className="amount">R {netBalance.toLocaleString()}</div>
        <div className="subtitle">
          {netBalance >= 0 ? `Surplus: R ${netBalance.toLocaleString()}` : `Deficit: R ${Math.abs(netBalance).toLocaleString()}`}
        </div>
      </div>

      <div className="summary-card debt-card">
        <h3>Credit Card Debt</h3>
        <div className="amount">R {debtRemaining.toLocaleString()}</div>
        <div className="subtitle">Outstanding balance</div>
      </div>
    </div>
  );
};

export default SummaryCards;
