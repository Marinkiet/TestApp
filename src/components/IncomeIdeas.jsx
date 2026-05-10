import React, { useState } from 'react';
import './IncomeIdeas.css';
import MiniCelebration from './MiniCelebration';

const incomeIdeasData = [
  {
    id: 1,
    icon: '💻',
    title: 'Freelance Development',
    description: 'Platforms: Upwork, Fiverr, Toptal',
    potential: 'R 5,000 - R 20,000/month',
    tips: ['Web development projects', 'Mobile app development', 'API integrations', 'Bug fixes & maintenance']
  },
  {
    id: 2,
    icon: '🎓',
    title: 'Online Courses & Tutorials',
    description: 'Platforms: Udemy, Skillshare, YouTube',
    potential: 'R 2,000 - R 15,000/month',
    tips: ['Create coding tutorials', 'Tech skill courses', 'Monetize YouTube channel', 'Paid mentorship sessions']
  },
  {
    id: 3,
    icon: '🚀',
    title: 'SaaS Products',
    description: 'Build & sell software solutions',
    potential: 'R 0 - R 50,000+/month',
    tips: ['Micro-SaaS applications', 'Chrome extensions', 'Mobile apps', 'API services']
  },
  {
    id: 4,
    icon: '📱',
    title: 'App Development',
    description: 'Create and monetize apps',
    potential: 'R 1,000 - R 30,000/month',
    tips: ['Ad revenue (AdMob)', 'In-app purchases', 'Subscription models', 'Sponsored features']
  },
  {
    id: 5,
    icon: '✍️',
    title: 'Technical Writing',
    description: 'Write for tech publications',
    potential: 'R 2,000 - R 10,000/month',
    tips: ['Blog posts for companies', 'Technical documentation', 'Dev.to, Medium articles', 'Guest posts (paid)']
  },
  {
    id: 6,
    icon: '🎨',
    title: 'Digital Products',
    description: 'Sell templates & tools',
    potential: 'R 1,000 - R 8,000/month',
    tips: ['Website templates', 'Code snippets/libraries', 'Design assets', 'Notion templates']
  }
];

const IncomeIdeas = ({ incomeIdeas, setIncomeIdeas }) => {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [celebration, setCelebration] = useState({ show: false, message: '', icon: '' });
  const [trackingEntry, setTrackingEntry] = useState({
    timeSpent: '',
    moneyInvested: '',
    moneyGenerated: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const startTracking = (idea) => {
    const existingIdea = incomeIdeas.find(i => i.id === idea.id);
    if (!existingIdea) {
      setIncomeIdeas([...incomeIdeas, { ...idea, entries: [] }]);
    }
    setSelectedIdea(idea);
    setShowTrackingModal(true);
  };

  const addTrackingEntry = () => {
    if (selectedIdea) {
      const newEntry = {
        id: Date.now(),
        timeSpent: parseFloat(trackingEntry.timeSpent) || 0,
        moneyInvested: parseFloat(trackingEntry.moneyInvested) || 0,
        moneyGenerated: parseFloat(trackingEntry.moneyGenerated) || 0,
        notes: trackingEntry.notes,
        date: trackingEntry.date
      };

      const updatedIdeas = incomeIdeas.map(idea => {
        if (idea.id === selectedIdea.id) {
          const newEntries = [...(idea.entries || []), newEntry];
          const totalInvested = newEntries.reduce((sum, e) => sum + e.moneyInvested, 0);
          const totalGenerated = newEntries.reduce((sum, e) => sum + e.moneyGenerated, 0);
          
          // Check for celebrations
          if (newEntry.moneyGenerated > 0 && newEntries.length === 1) {
            setCelebration({ show: true, message: 'First income! You\'re making money!', icon: '💰' });
          } else if (totalGenerated >= 1000 && totalGenerated - newEntry.moneyGenerated < 1000) {
            setCelebration({ show: true, message: 'R1,000 generated! Keep going!', icon: '🎯' });
          } else if (totalGenerated >= 5000 && totalGenerated - newEntry.moneyGenerated < 5000) {
            setCelebration({ show: true, message: 'R5,000 generated! Entrepreneur!', icon: '🚀' });
          } else if (totalGenerated >= 10000 && totalGenerated - newEntry.moneyGenerated < 10000) {
            setCelebration({ show: true, message: 'R10,000 generated! Business builder!', icon: '🏢' });
          } else if (totalGenerated > totalInvested && totalGenerated - newEntry.moneyGenerated <= totalInvested) {
            setCelebration({ show: true, message: 'PROFITABLE! Positive ROI achieved!', icon: '📈' });
          } else if (newEntry.moneyGenerated > 0) {
            setCelebration({ show: true, message: `+R${newEntry.moneyGenerated} earned!`, icon: '💵' });
          }
          
          return {
            ...idea,
            entries: newEntries
          };
        }
        return idea;
      });

      // If idea doesn't exist yet, add it
      if (!incomeIdeas.find(i => i.id === selectedIdea.id)) {
        updatedIdeas.push({
          ...selectedIdea,
          entries: [newEntry]
        });
        
        if (newEntry.moneyGenerated > 0) {
          setCelebration({ show: true, message: 'First income tracked!', icon: '🎉' });
        }
      }

      setIncomeIdeas(updatedIdeas);
      setTrackingEntry({
        timeSpent: '',
        moneyInvested: '',
        moneyGenerated: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowTrackingModal(false);
    }
  };

  const getIdeaStats = (ideaId) => {
    const idea = incomeIdeas.find(i => i.id === ideaId);
    if (!idea || !idea.entries) return null;

    const totalTime = idea.entries.reduce((sum, e) => sum + e.timeSpent, 0);
    const totalInvested = idea.entries.reduce((sum, e) => sum + e.moneyInvested, 0);
    const totalGenerated = idea.entries.reduce((sum, e) => sum + e.moneyGenerated, 0);
    const roi = totalInvested > 0 ? ((totalGenerated - totalInvested) / totalInvested * 100).toFixed(1) : 0;

    return { totalTime, totalInvested, totalGenerated, roi, entryCount: idea.entries.length };
  };

  return (
    <div className="card income-ideas">
      <h2>💡 Income Generation Ideas</h2>
      
      <MiniCelebration
        show={celebration.show}
        message={celebration.message}
        icon={celebration.icon}
        onClose={() => setCelebration({ show: false, message: '', icon: '' })}
      />
      
      <div className="ideas-grid">
        {incomeIdeasData.map(idea => {
          const stats = getIdeaStats(idea.id);
          const isTracking = stats && stats.entryCount > 0;

          return (
            <div key={idea.id} className={`idea-card ${isTracking ? 'tracking' : ''}`}>
              <div className="idea-icon">{idea.icon}</div>
              <h3>{idea.title}</h3>
              <p className="idea-description">{idea.description}</p>
              
              <ul className="idea-tips">
                {idea.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>

              <div className="idea-potential">{idea.potential}</div>

              {isTracking && stats && (
                <div className="idea-stats">
                  <div className="stat-item">
                    <span className="stat-label">Time:</span>
                    <span className="stat-value">{stats.totalTime}h</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Invested:</span>
                    <span className="stat-value">R{stats.totalInvested}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Generated:</span>
                    <span className="stat-value text-success">R{stats.totalGenerated}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">ROI:</span>
                    <span className={`stat-value ${stats.roi >= 0 ? 'text-success' : 'text-danger'}`}>
                      {stats.roi}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Entries:</span>
                    <span className="stat-value">{stats.entryCount}</span>
                  </div>
                </div>
              )}

              <button
                className="btn btn-primary btn-sm"
                onClick={() => startTracking(idea)}
              >
                {isTracking ? '+ Add Entry' : 'Start Tracking'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Tracking Modal */}
      {showTrackingModal && selectedIdea && (
        <div className="modal-overlay" onClick={() => setShowTrackingModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Track Progress: {selectedIdea.title}</h2>

            <div className="form-group">
              <label>Time Spent (hours)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 5"
                value={trackingEntry.timeSpent}
                onChange={(e) => setTrackingEntry({ ...trackingEntry, timeSpent: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Money Invested (R)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 500"
                value={trackingEntry.moneyInvested}
                onChange={(e) => setTrackingEntry({ ...trackingEntry, moneyInvested: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Money Generated (R)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 2000"
                value={trackingEntry.moneyGenerated}
                onChange={(e) => setTrackingEntry({ ...trackingEntry, moneyGenerated: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-input"
                value={trackingEntry.date}
                onChange={(e) => setTrackingEntry({ ...trackingEntry, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                className="form-textarea"
                placeholder="What did you work on? Any learnings?"
                value={trackingEntry.notes}
                onChange={(e) => setTrackingEntry({ ...trackingEntry, notes: e.target.value })}
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-success" onClick={addTrackingEntry}>
                Add Entry
              </button>
              <button className="btn btn-secondary" onClick={() => setShowTrackingModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeIdeas;
