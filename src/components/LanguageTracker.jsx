import React, { useState } from 'react';
import './LanguageTracker.css';
import MiniCelebration from './MiniCelebration';

const LanguageTracker = ({ languageData, setLanguageData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [celebration, setCelebration] = useState({ show: false, message: '', icon: '' });
  const [newSession, setNewSession] = useState({
    date: new Date().toISOString().split('T')[0],
    duration: '',
    language: '',
    activity: '',
    notes: ''
  });

  const addSession = () => {
    if (newSession.duration && newSession.language && newSession.activity) {
      const newSessions = [
        ...languageData.sessions,
        {
          id: Date.now(),
          date: newSession.date,
          duration: parseFloat(newSession.duration),
          language: newSession.language,
          activity: newSession.activity,
          notes: newSession.notes
        }
      ];
      
      setLanguageData({
        ...languageData,
        sessions: newSessions
      });
      
      // Check for milestones
      const totalSessions = newSessions.length;
      const totalMinutes = newSessions.reduce((sum, s) => sum + s.duration, 0);
      const totalHours = Math.floor(totalMinutes / 60);
      
      if (totalSessions === 1) {
        setCelebration({ show: true, message: 'First study session! 📚', icon: '🌱' });
      } else if (totalSessions === 10) {
        setCelebration({ show: true, message: '10 sessions! Consistent learner!', icon: '🔥' });
      } else if (totalSessions === 30) {
        setCelebration({ show: true, message: '30 sessions! Dedicated!', icon: '🎓' });
      } else if (totalSessions === 50) {
        setCelebration({ show: true, message: '50 sessions! Polyglot in training!', icon: '🌍' });
      } else if (totalSessions === 100) {
        setCelebration({ show: true, message: '100 SESSIONS! Language Master!', icon: '👑' });
      } else if (totalHours === 10 || totalHours === 25 || totalHours === 50 || totalHours === 100) {
        setCelebration({ show: true, message: `${totalHours} hours of learning!`, icon: '⭐' });
      } else {
        setCelebration({ show: true, message: 'Session logged! Keep learning!', icon: '✅' });
      }
      
      setNewSession({
        date: new Date().toISOString().split('T')[0],
        duration: '',
        language: '',
        activity: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  const deleteSession = (id) => {
    setLanguageData({
      ...languageData,
      sessions: languageData.sessions.filter(s => s.id !== id)
    });
  };

  const updateGoal = (newGoal) => {
    setLanguageData({ ...languageData, goal: parseInt(newGoal) || 30 });
  };

  // Get current month sessions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthSessions = languageData.sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  });

  const monthMinutes = monthSessions.reduce((sum, s) => sum + s.duration, 0);
  const progress = (monthMinutes / languageData.goal) * 100;
  const totalMinutes = languageData.sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Get language breakdown
  const languageBreakdown = languageData.sessions.reduce((acc, session) => {
    acc[session.language] = (acc[session.language] || 0) + session.duration;
    return acc;
  }, {});

  return (
    <div className="card language-tracker">
      <div className="section-header">
        <h2>🌍 Language Learning</h2>
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
          <div className="stat-value">{monthMinutes}</div>
          <div className="stat-label">Minutes This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{languageData.sessions.length}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalHours}h</div>
          <div className="stat-label">Total Time</div>
        </div>
      </div>

      <div className="goal-section">
        <div className="goal-header">
          <span>Monthly Goal:</span>
          <input
            type="number"
            className="goal-input"
            value={languageData.goal}
            onChange={(e) => updateGoal(e.target.value)}
            min="1"
          />
          <span>minutes</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}>
            {progress > 10 && `${Math.min(progress, 100).toFixed(0)}%`}
          </div>
        </div>
        <div className="progress-text">
          {monthMinutes} / {languageData.goal} minutes completed
        </div>
      </div>

      {Object.keys(languageBreakdown).length > 0 && (
        <div className="language-breakdown">
          <h3>Languages</h3>
          <div className="language-list">
            {Object.entries(languageBreakdown).map(([language, minutes]) => (
              <div key={language} className="language-item">
                <span className="language-name">{language}</span>
                <span className="language-time">{(minutes / 60).toFixed(1)}h</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
            <label>Duration (minutes)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g., 30"
              value={newSession.duration}
              onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Spanish, French, Mandarin"
              value={newSession.language}
              onChange={(e) => setNewSession({ ...newSession, language: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Activity</label>
            <select
              className="form-select"
              value={newSession.activity}
              onChange={(e) => setNewSession({ ...newSession, activity: e.target.value })}
            >
              <option value="">Select activity</option>
              <option value="Duolingo">Duolingo</option>
              <option value="Reading">Reading</option>
              <option value="Listening">Listening</option>
              <option value="Speaking">Speaking Practice</option>
              <option value="Writing">Writing</option>
              <option value="Flashcards">Flashcards</option>
              <option value="Conversation">Conversation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="What did you learn?"
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

      {languageData.sessions.length > 0 ? (
        <div className="sessions-list">
          <h3>Recent Sessions</h3>
          {languageData.sessions.slice(-5).reverse().map(session => (
            <div key={session.id} className="session-item">
              <div className="session-info">
                <div className="session-header">
                  <span className="session-language">{session.language}</span>
                  <span className="session-activity">{session.activity}</span>
                </div>
                <div className="session-details">
                  {new Date(session.date).toLocaleDateString()} • {session.duration} min
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
          <div className="empty-state-icon">📚</div>
          <p>No language sessions logged yet. Start your learning journey!</p>
        </div>
      )}
    </div>
  );
};

export default LanguageTracker;
