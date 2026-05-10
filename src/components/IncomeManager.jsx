import React, { useState } from 'react';
import './IncomeManager.css';

const IncomeManager = ({ currentSalary, setCurrentSalary, additionalIncome, setAdditionalIncome }) => {
  const [salaryType, setSalaryType] = useState('best');
  const [customSalary, setCustomSalary] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIncome, setNewIncome] = useState({ source: '', amount: '', date: '' });

  const handleSalaryChange = (type) => {
    setSalaryType(type);
    if (type === 'best') setCurrentSalary(29500);
    else if (type === 'worst') setCurrentSalary(28300);
  };

  const handleCustomSalary = (value) => {
    setCustomSalary(value);
    setCurrentSalary(parseFloat(value) || 0);
  };

  const addIncomeStream = () => {
    if (newIncome.source && newIncome.amount) {
      setAdditionalIncome([
        ...additionalIncome,
        {
          id: Date.now(),
          source: newIncome.source,
          amount: parseFloat(newIncome.amount),
          date: newIncome.date || new Date().toISOString().split('T')[0]
        }
      ]);
      setNewIncome({ source: '', amount: '', date: '' });
      setShowAddForm(false);
    }
  };

  const removeIncome = (id) => {
    setAdditionalIncome(additionalIncome.filter(income => income.id !== id));
  };

  return (
    <div className="card income-manager">
      <h2>📈 Income Management</h2>
      
      <div className="salary-selector">
        <label>Monthly Salary:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              checked={salaryType === 'best'}
              onChange={() => handleSalaryChange('best')}
            />
            <span>Best Case: R 29,500</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              checked={salaryType === 'worst'}
              onChange={() => handleSalaryChange('worst')}
            />
            <span>Worst Case: R 28,300</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              checked={salaryType === 'custom'}
              onChange={() => setSalaryType('custom')}
            />
            <span>Custom Amount</span>
          </label>
        </div>
        
        {salaryType === 'custom' && (
          <input
            type="number"
            className="form-input"
            placeholder="Enter custom salary"
            value={customSalary}
            onChange={(e) => handleCustomSalary(e.target.value)}
          />
        )}
      </div>

      <div className="additional-income-section">
        <div className="section-header">
          <h3>Additional Income Streams</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
            + Add Income
          </button>
        </div>

        {showAddForm && (
          <div className="add-form">
            <input
              type="text"
              className="form-input"
              placeholder="Income source (e.g., Freelance)"
              value={newIncome.source}
              onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Amount (R)"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
            />
            <input
              type="date"
              className="form-input"
              value={newIncome.date}
              onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
            />
            <div className="form-actions">
              <button className="btn btn-success btn-sm" onClick={addIncomeStream}>
                Save
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {additionalIncome.length > 0 ? (
          <div className="income-list">
            {additionalIncome.map(income => (
              <div key={income.id} className="income-item">
                <div className="income-info">
                  <div className="income-source">{income.source}</div>
                  <div className="income-amount">R {income.amount.toLocaleString()}</div>
                  <div className="income-date">{new Date(income.date).toLocaleDateString()}</div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeIncome(income.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">💼</div>
            <p>No additional income streams yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeManager;
