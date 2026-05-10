import React, { useState } from 'react';
import './ExpenseManager.css';

const ExpenseManager = ({ expenses, setExpenses }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: '',
    type: 'fixed',
    note: ''
  });

  const categories = ['Housing', 'Transportation', 'Utilities', 'Food', 'Subscriptions', 'Insurance', 'Banking', 'Charity', 'Debt', 'Other'];

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      const expense = {
        id: Date.now(),
        name: newExpense.name,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category || 'Other',
        note: newExpense.note
      };

      setExpenses({
        ...expenses,
        [newExpense.type]: [...expenses[newExpense.type], expense]
      });

      setNewExpense({ name: '', amount: '', category: '', type: 'fixed', note: '' });
      setShowAddModal(false);
    }
  };

  const updateExpense = () => {
    if (editingExpense) {
      const updatedExpenses = { ...expenses };
      const typeArray = updatedExpenses[editingExpense.type];
      const index = typeArray.findIndex(exp => exp.id === editingExpense.id);
      
      if (index !== -1) {
        typeArray[index] = {
          ...editingExpense,
          amount: parseFloat(editingExpense.amount)
        };
        setExpenses(updatedExpenses);
      }
      
      setEditingExpense(null);
    }
  };

  const deleteExpense = (id, type) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses({
        ...expenses,
        [type]: expenses[type].filter(exp => exp.id !== id)
      });
    }
  };

  const moveExpense = (id, fromType, toType) => {
    const expense = expenses[fromType].find(exp => exp.id === id);
    if (expense) {
      setExpenses({
        ...expenses,
        [fromType]: expenses[fromType].filter(exp => exp.id !== id),
        [toType]: [...expenses[toType], expense]
      });
    }
  };

  const renderExpenseTable = (type, title) => {
    const expenseList = expenses[type] || [];
    const total = expenseList.reduce((sum, exp) => sum + exp.amount, 0);

    return (
      <div className="expense-section">
        <div className="expense-header">
          <h3>{title}</h3>
          <div className="expense-total">Total: R {total.toLocaleString()}</div>
        </div>
        
        {expenseList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map(expense => (
                <tr key={expense.id}>
                  <td>
                    <div className="expense-name">{expense.name}</div>
                    {expense.note && <div className="expense-note">{expense.note}</div>}
                  </td>
                  <td>
                    <span className="badge badge-info">{expense.category}</span>
                  </td>
                  <td className="expense-amount">R {expense.amount.toLocaleString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingExpense({ ...expense, type })}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => moveExpense(expense.id, type, type === 'fixed' ? 'variable' : 'fixed')}
                      >
                        Move to {type === 'fixed' ? 'Variable' : 'Fixed'}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteExpense(expense.id, type)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No {title.toLowerCase()} yet</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card expense-manager">
      <div className="section-header">
        <h2>💳 Expense Management</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Expense
        </button>
      </div>

      {renderExpenseTable('fixed', 'Fixed Expenses')}
      {renderExpenseTable('variable', 'Variable Expenses')}

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Expense</h2>
            
            <div className="form-group">
              <label>Expense Name</label>
              <input
                type="text"
                className="form-input"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                placeholder="e.g., Gym Membership"
              />
            </div>

            <div className="form-group">
              <label>Amount (R)</label>
              <input
                type="number"
                className="form-input"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-select"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                className="form-select"
                value={newExpense.type}
                onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
              >
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
              </select>
            </div>

            <div className="form-group">
              <label>Note (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={newExpense.note}
                onChange={(e) => setNewExpense({ ...newExpense, note: e.target.value })}
                placeholder="Additional notes"
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-success" onClick={addExpense}>
                Add Expense
              </button>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {editingExpense && (
        <div className="modal-overlay" onClick={() => setEditingExpense(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Expense</h2>
            
            <div className="form-group">
              <label>Expense Name</label>
              <input
                type="text"
                className="form-input"
                value={editingExpense.name}
                onChange={(e) => setEditingExpense({ ...editingExpense, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Amount (R)</label>
              <input
                type="number"
                className="form-input"
                value={editingExpense.amount}
                onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-select"
                value={editingExpense.category}
                onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Note (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={editingExpense.note || ''}
                onChange={(e) => setEditingExpense({ ...editingExpense, note: e.target.value })}
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-success" onClick={updateExpense}>
                Update Expense
              </button>
              <button className="btn btn-secondary" onClick={() => setEditingExpense(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManager;
