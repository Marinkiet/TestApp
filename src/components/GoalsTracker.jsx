import React, { useState } from 'react';
import './GoalsTracker.css';
import MiniCelebration from './MiniCelebration';

const GoalsTracker = ({ debtRemaining, setDebtRemaining, emergencyFund, setEmergencyFund }) => {
  const [debtPayment, setDebtPayment] = useState('');
  const [emergencyAmount, setEmergencyAmount] = useState('');
  const [celebration, setCelebration] = useState({ show: false, message: '', icon: '' });

  const initialDebt = 30000;
  const emergencyGoal = 30000;

  const debtProgress = ((initialDebt - debtRemaining) / initialDebt) * 100;
  const emergencyProgress = (emergencyFund / emergencyGoal) * 100;

  const handleDebtPayment = () => {
    const payment = parseFloat(debtPayment);
    if (payment > 0 && payment <= debtRemaining) {
      const newDebt = debtRemaining - payment;
      setDebtRemaining(newDebt);
      setDebtPayment('');
      
      // Show celebrations for milestones
      if (newDebt === 0) {
        setCelebration({ show: true, message: '🎉 DEBT FREE! You did it!', icon: '🏆' });
      } else if (debtRemaining > 25000 && newDebt <= 25000) {
        setCelebration({ show: true, message: 'Milestone! Under R25,000!', icon: '🎯' });
      } else if (debtRemaining > 20000 && newDebt <= 20000) {
        setCelebration({ show: true, message: 'Amazing! Under R20,000!', icon: '💪' });
      } else if (debtRemaining > 15000 && newDebt <= 15000) {
        setCelebration({ show: true, message: 'Halfway there! Under R15,000!', icon: '🔥' });
      } else if (debtRemaining > 10000 && newDebt <= 10000) {
        setCelebration({ show: true, message: 'Incredible! Under R10,000!', icon: '⚡' });
      } else if (debtRemaining > 5000 && newDebt <= 5000) {
        setCelebration({ show: true, message: 'Almost there! Under R5,000!', icon: '🌟' });
      } else {
        setCelebration({ show: true, message: `Great job! R${payment.toLocaleString()} paid!`, icon: '💰' });
      }
    } else {
      alert('Please enter a valid payment amount');
    }
  };

  const handleEmergencyFund = () => {
    const amount = parseFloat(emergencyAmount);
    if (amount > 0) {
      const newFund = emergencyFund + amount;
      setEmergencyFund(newFund);
      setEmergencyAmount('');
      
      // Show celebrations for milestones
      if (newFund >= 30000) {
        setCelebration({ show: true, message: '🎉 Emergency Fund Complete!', icon: '🏆' });
      } else if (emergencyFund < 25000 && newFund >= 25000) {
        setCelebration({ show: true, message: 'Milestone! R25,000 saved!', icon: '💎' });
      } else if (emergencyFund < 20000 && newFund >= 20000) {
        setCelebration({ show: true, message: 'Amazing! R20,000 saved!', icon: '💰' });
      } else if (emergencyFund < 15000 && newFund >= 15000) {
        setCelebration({ show: true, message: 'Halfway there! R15,000!', icon: '🌟' });
      } else if (emergencyFund < 10000 && newFund >= 10000) {
        setCelebration({ show: true, message: 'Great progress! R10,000!', icon: '🎯' });
      } else if (emergencyFund < 5000 && newFund >= 5000) {
        setCelebration({ show: true, message: 'Nice! R5,000 saved!', icon: '🌱' });
      } else {
        setCelebration({ show: true, message: `+R${amount.toLocaleString()} saved!`, icon: '💵' });
      }
    } else {
      alert('Please enter a valid amount');
    }
  };

  const monthsToPayOffDebt = debtRemaining > 0 ? Math.ceil(debtRemaining / 2500) : 0;

  return (
    <div className="card goals-tracker">
      <h2>🎯 Financial Goals</h2>

      <MiniCelebration
        show={celebration.show}
        message={celebration.message}
        icon={celebration.icon}
        onClose={() => setCelebration({ show: false, message: '', icon: '' })}
      />

      <div className="goal-item">
        <h3>Pay Off Credit Card</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${debtProgress}%` }}>
            {debtProgress > 10 && `${debtProgress.toFixed(0)}%`}
          </div>
        </div>
        <div className="goal-stats">
          <div className="stat">
            <span className="label">Remaining:</span>
            <span className="value">R {debtRemaining.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Paid:</span>
            <span className="value text-success">R {(initialDebt - debtRemaining).toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Est. Months:</span>
            <span className="value">{monthsToPayOffDebt} months</span>
          </div>
        </div>
        <div className="goal-action">
          <input
            type="number"
            className="form-input"
            placeholder="Payment amount (R)"
            value={debtPayment}
            onChange={(e) => setDebtPayment(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleDebtPayment}>
            Make Payment
          </button>
        </div>
      </div>

      <div className="goal-item">
        <h3>Emergency Fund</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(emergencyProgress, 100)}%` }}>
            {emergencyProgress > 10 && `${Math.min(emergencyProgress, 100).toFixed(0)}%`}
          </div>
        </div>
        <div className="goal-stats">
          <div className="stat">
            <span className="label">Current:</span>
            <span className="value text-success">R {emergencyFund.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Goal:</span>
            <span className="value">R {emergencyGoal.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Remaining:</span>
            <span className="value">R {Math.max(0, emergencyGoal - emergencyFund).toLocaleString()}</span>
          </div>
        </div>
        <div className="goal-action">
          <input
            type="number"
            className="form-input"
            placeholder="Amount to add (R)"
            value={emergencyAmount}
            onChange={(e) => setEmergencyAmount(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleEmergencyFund}>
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsTracker;
