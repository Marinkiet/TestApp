import React, { useState } from 'react';
import './UnexpectedTransactions.css';

const UnexpectedTransactions = ({ transactions, setTransactions }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const addTransaction = () => {
    if (newTransaction.description && newTransaction.amount) {
      setTransactions([
        ...transactions,
        {
          id: Date.now(),
          type: newTransaction.type,
          description: newTransaction.description,
          amount: parseFloat(newTransaction.amount),
          date: newTransaction.date
        }
      ]);
      setNewTransaction({
        type: 'expense',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalUnexpectedIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalUnexpectedExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="card unexpected-transactions">
      <div className="section-header">
        <h2>⚡ Unexpected Transactions</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
          + Add Transaction
        </button>
      </div>

      <div className="transaction-summary">
        <div className="summary-item income">
          <span className="label">Unexpected Income:</span>
          <span className="value">R {totalUnexpectedIncome.toLocaleString()}</span>
        </div>
        <div className="summary-item expense">
          <span className="label">Unexpected Expenses:</span>
          <span className="value">R {totalUnexpectedExpenses.toLocaleString()}</span>
        </div>
      </div>

      {showAddForm && (
        <div className="add-form">
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-select"
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Car repair, Bonus"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Amount (R)</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-input"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-success btn-sm" onClick={addTransaction}>
              Add
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {transactions.length > 0 ? (
        <div className="transaction-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-info">
                <div className="transaction-type-badge">
                  {transaction.type === 'income' ? '💰' : '💸'} {transaction.type}
                </div>
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</div>
              </div>
              <div className="transaction-right">
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}R {transaction.amount.toLocaleString()}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>No unexpected transactions yet</p>
        </div>
      )}
    </div>
  );
};

export default UnexpectedTransactions;
