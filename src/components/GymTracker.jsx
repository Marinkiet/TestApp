import React, { useState } from 'react';
import './GymTracker.css';
import MiniCelebration from './MiniCelebration';

const GymTracker = ({ gymData, setGymData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [celebration, setCelebration] = useState({ show: false, message: '', icon: '' });
  const [newSession, setNewSession] = useState({
    date: new Date().toISOString().split('T')[0],
    duration: '',
    type: '',
    notes: ''
  });

  const addSession = () => {
    if (newSession.duration && newSession.type) {
      const newSessions = [
        ...gymData.sessions,
        {
          id: Date.now(),
          date: newSession.date,
          duration: parseFloat(newSession.duration),
          type: newSession.type,
          notes: newSession.notes
        }
      ];
      
      setGymData({
        ...gymData,
        sessions: newSessions
      });
      
      // Check for milestones
      const totalSessions = newSessions.length;
      const totalHours = newSessions.reduce((sum, s) => sum + s.duration, 0);
      
      if (totalSessions === 1) {
        setCelebration({ show: true, message: 'First workout logged! 💪', icon: '🏃' });
      } else if (totalSessions === 10) {
        setCelebration({ show: true, message: '10 workouts! You\'re on fire!', icon: '🔥' });
      } else if (totalSessions === 25) {
        setCelebration({ show: true, message: '25 workouts! Unstoppable!', icon: '⚡' });
      } else if (totalSessions === 50) {
        setCelebration({ show: true, message: '50 workouts! Legend!', icon: '🏆' });
      } else if (totalSessions === 100) {
        setCelebration({ show: true, message: '100 WORKOUTS! TITAN!', icon: '👑' });
      } else if (Math.floor(totalHours) === 10 || Math.floor(totalHours) === 25 || Math.floor(totalHours) === 50 || Math.floor(totalHours) === 100) {
        setCelebration({ show: true, message: `${Math.floor(totalHours)} hours of training!`, icon: '💪' });
      } else {
        setCelebration({ show: true, message: 'Workout logged! Keep it up!', icon: '✅' });
      }
      
      setNewSession({
        date: new Date().toISOString().split('T')[0],
        duration: '',
        type: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteSession = (id) => {
    setGymData({
      ...gymData,
      sessions: gymData.sessions.filter(s => s.id !== id)
    });
  };

  const updateGoal = (newGoal) => {
    setGymData({ ...gymData, goal: parseInt(newGoal) || 12 });
  };

  // Get current month sessions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthSessions = gymData.sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  const progress = (monthSessions.length / gymData.goal) * 100;
  const totalHours = gymData.sessions.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="card gym-tracker">
      <div className="section-header">
        <h2>💪 Gym Tracker</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
          + Log Session
        </button>
      </div>

      <MiniCelebration
        show={celebration.show}
        message={celebration.message}
        icon={celebration.icon}
        onClose={() => setCelebration({ show: false, message: '', icon: '' })}
      />

      <div className="tracker-stats">
        <div className="stat-card">
          <div className="stat-value">{monthSessions.length}</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{gymData.sessions.length}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalHours.toFixed(1)}h</div>
          <div className="stat-label">Total Hours</div>
        </div>
      </div>

      <div className="goal-section">
        <div className="goal-header">
          <span>Monthly Goal:</span>
          <input
            type="number"
            className="goal-input"
            value={gymData.goal}
            onChange={(e) => updateGoal(e.target.value)}
            min="1"
          />
          <span>sessions</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}>
            {progress > 10 && `${Math.min(progress, 100).toFixed(0)}%`}
          </div>
        </div>
        <div className="progress-text">
          {monthSessions.length} / {gymData.goal} sessions completed
        </div>
      </div>

      {showAddForm && (
        <div className="add-form">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-input"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Duration (hours)</label>
            <input
              type="number"
              step="0.5"
              className="form-input"
              placeholder="e.g., 1.5"
              value={newSession.duration}
              onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Workout Type</label>
            <select
              className="form-select"
              value={newSession.type}
              onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength Training</option>
              <option value="HIIT">HIIT</option>
              <option value="Yoga">Yoga</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Chest and triceps"
              value={newSession.notes}
              onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-success btn-sm" onClick={addSession}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {gymData.sessions.length > 0 ? (
        <div className="sessions-list">
          <h3>Recent Sessions</h3>
          {gymData.sessions.slice(-5).reverse().map(session => (
            <div key={session.id} className="session-item">
              <div className="session-info">
                <div className="session-type">{session.type}</div>
                <div className="session-details">
                  {new Date(session.date).toLocaleDateString()} • {session.duration}h
                </div>
                {session.notes && <div className="session-notes">{session.notes}</div>}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteSession(session.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <p>No gym sessions logged yet. Start tracking your fitness journey!</p>
        </div>
      )}
    </div>
  );
};

export default GymTracker;
