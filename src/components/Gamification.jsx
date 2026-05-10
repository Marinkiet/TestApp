import React, { useState, useEffect } from 'react';
import './Gamification.css';

const achievements = [
  // Debt Achievements
  { id: 'debt_first_payment', title: 'First Step', description: 'Made your first debt payment', icon: '🎯', points: 50, category: 'debt' },
  { id: 'debt_1000', title: 'Debt Crusher', description: 'Paid off R1,000 in debt', icon: '💪', points: 100, category: 'debt' },
  { id: 'debt_5000', title: 'Debt Warrior', description: 'Paid off R5,000 in debt', icon: '⚔️', points: 250, category: 'debt' },
  { id: 'debt_10000', title: 'Debt Destroyer', description: 'Paid off R10,000 in debt', icon: '🔥', points: 500, category: 'debt' },
  { id: 'debt_free', title: 'DEBT FREE!', description: 'Completely paid off your debt!', icon: '🏆', points: 1000, category: 'debt' },
  
  // Savings Achievements
  { id: 'savings_first', title: 'Saver', description: 'Started your emergency fund', icon: '🌱', points: 50, category: 'savings' },
  { id: 'savings_1000', title: 'Safety Net', description: 'Saved R1,000', icon: '🛡️', points: 100, category: 'savings' },
  { id: 'savings_5000', title: 'Financial Cushion', description: 'Saved R5,000', icon: '💎', points: 250, category: 'savings' },
  { id: 'savings_10000', title: 'Wealth Builder', description: 'Saved R10,000', icon: '💰', points: 500, category: 'savings' },
  { id: 'savings_goal', title: 'Emergency Fund Complete!', description: 'Reached R30,000 goal', icon: '🏆', points: 1000, category: 'savings' },
  
  // Income Achievements
  { id: 'income_first', title: 'Side Hustler', description: 'Earned your first extra income', icon: '💼', points: 100, category: 'income' },
  { id: 'income_1000', title: 'Money Maker', description: 'Generated R1,000 from side income', icon: '💵', points: 200, category: 'income' },
  { id: 'income_5000', title: 'Entrepreneur', description: 'Generated R5,000 from side income', icon: '🚀', points: 500, category: 'income' },
  { id: 'income_10000', title: 'Business Builder', description: 'Generated R10,000 from side income', icon: '🏢', points: 1000, category: 'income' },
  { id: 'income_positive_roi', title: 'Profitable!', description: 'Achieved positive ROI on an income idea', icon: '📈', points: 300, category: 'income' },
  
  // Expense Achievements
  { id: 'expense_reduced_100', title: 'Budget Conscious', description: 'Reduced expenses by R100', icon: '✂️', points: 50, category: 'expense' },
  { id: 'expense_reduced_500', title: 'Frugal Master', description: 'Reduced expenses by R500', icon: '🎯', points: 150, category: 'expense' },
  { id: 'expense_reduced_1000', title: 'Savings Expert', description: 'Reduced expenses by R1,000', icon: '🌟', points: 300, category: 'expense' },
  
  // Fitness Achievements
  { id: 'gym_first', title: 'Fitness Journey', description: 'Logged your first workout', icon: '🏃', points: 25, category: 'fitness' },
  { id: 'gym_streak_7', title: 'Week Warrior', description: '7-day workout streak', icon: '🔥', points: 100, category: 'fitness' },
  { id: 'gym_streak_30', title: 'Month Master', description: '30-day workout streak', icon: '💪', points: 300, category: 'fitness' },
  { id: 'gym_goal', title: 'Fitness Goal!', description: 'Reached monthly gym goal', icon: '🏆', points: 150, category: 'fitness' },
  { id: 'gym_100_hours', title: 'Century Club', description: '100 hours of workouts', icon: '💯', points: 500, category: 'fitness' },
  
  // Learning Achievements
  { id: 'language_first', title: 'Polyglot Beginner', description: 'Started learning a language', icon: '📚', points: 25, category: 'learning' },
  { id: 'language_streak_7', title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', points: 100, category: 'learning' },
  { id: 'language_streak_30', title: 'Dedicated Student', description: '30-day learning streak', icon: '🎓', points: 300, category: 'learning' },
  { id: 'language_goal', title: 'Learning Goal!', description: 'Reached monthly learning goal', icon: '🏆', points: 150, category: 'learning' },
  { id: 'language_10_hours', title: 'Language Enthusiast', description: '10 hours of study', icon: '🌍', points: 200, category: 'learning' },
  
  // Consistency Achievements
  { id: 'tracking_7_days', title: 'Consistent Tracker', description: 'Tracked finances for 7 days', icon: '📊', points: 100, category: 'consistency' },
  { id: 'tracking_30_days', title: 'Monthly Tracker', description: 'Tracked finances for 30 days', icon: '📈', points: 300, category: 'consistency' },
  { id: 'tracking_90_days', title: 'Quarterly Master', description: 'Tracked finances for 90 days', icon: '🎯', points: 500, category: 'consistency' },
  { id: 'report_first', title: 'Analyst', description: 'Generated your first report', icon: '📄', points: 50, category: 'consistency' },
  { id: 'report_5', title: 'Data Driven', description: 'Generated 5 reports', icon: '📊', points: 150, category: 'consistency' },
  
  // Balance Achievements
  { id: 'balance_positive', title: 'In The Black', description: 'Achieved positive monthly balance', icon: '✅', points: 100, category: 'balance' },
  { id: 'balance_positive_3', title: 'Sustainable', description: '3 months of positive balance', icon: '🌟', points: 300, category: 'balance' },
  { id: 'balance_1000_surplus', title: 'Surplus King', description: 'R1,000+ monthly surplus', icon: '👑', points: 200, category: 'balance' },
];

const levels = [
  { level: 1, title: 'Beginner', minPoints: 0, icon: '🌱', color: '#10b981' },
  { level: 2, title: 'Apprentice', minPoints: 500, icon: '🌿', color: '#10b981' },
  { level: 3, title: 'Practitioner', minPoints: 1000, icon: '🌳', color: '#059669' },
  { level: 4, title: 'Expert', minPoints: 2000, icon: '⭐', color: '#f59e0b' },
  { level: 5, title: 'Master', minPoints: 3500, icon: '💎', color: '#8b5cf6' },
  { level: 6, title: 'Grandmaster', minPoints: 5000, icon: '👑', color: '#ec4899' },
  { level: 7, title: 'Legend', minPoints: 7500, icon: '🏆', color: '#ef4444' },
  { level: 8, title: 'Titan', minPoints: 10000, icon: '⚡', color: '#3b82f6' },
];

const Gamification = ({ 
  debtPaid, 
  emergencyFund, 
  incomeGenerated, 
  expenseReduction,
  gymSessions,
  languageSessions,
  reportsGenerated,
  netBalance,
  daysTracking
}) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievements, setNewAchievements] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levels[0]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  useEffect(() => {
    // Load saved data
    const saved = localStorage.getItem('gamificationData');
    if (saved) {
      const data = JSON.parse(saved);
      setUnlockedAchievements(data.unlockedAchievements || []);
      setTotalPoints(data.totalPoints || 0);
    }
  }, []);

  useEffect(() => {
    checkAchievements();
  }, [debtPaid, emergencyFund, incomeGenerated, expenseReduction, gymSessions, languageSessions, reportsGenerated, netBalance, daysTracking]);

  useEffect(() => {
    // Update level based on points
    const level = [...levels].reverse().find(l => totalPoints >= l.minPoints) || levels[0];
    setCurrentLevel(level);
  }, [totalPoints]);

  useEffect(() => {
    // Save data
    localStorage.setItem('gamificationData', JSON.stringify({
      unlockedAchievements,
      totalPoints
    }));
  }, [unlockedAchievements, totalPoints]);

  const checkAchievements = () => {
    const newlyUnlocked = [];

    achievements.forEach(achievement => {
      if (unlockedAchievements.includes(achievement.id)) return;

      let unlocked = false;

      // Check debt achievements
      if (achievement.id === 'debt_first_payment' && debtPaid > 0) unlocked = true;
      if (achievement.id === 'debt_1000' && debtPaid >= 1000) unlocked = true;
      if (achievement.id === 'debt_5000' && debtPaid >= 5000) unlocked = true;
      if (achievement.id === 'debt_10000' && debtPaid >= 10000) unlocked = true;
      if (achievement.id === 'debt_free' && debtPaid >= 30000) unlocked = true;

      // Check savings achievements
      if (achievement.id === 'savings_first' && emergencyFund > 0) unlocked = true;
      if (achievement.id === 'savings_1000' && emergencyFund >= 1000) unlocked = true;
      if (achievement.id === 'savings_5000' && emergencyFund >= 5000) unlocked = true;
      if (achievement.id === 'savings_10000' && emergencyFund >= 10000) unlocked = true;
      if (achievement.id === 'savings_goal' && emergencyFund >= 30000) unlocked = true;

      // Check income achievements
      if (achievement.id === 'income_first' && incomeGenerated > 0) unlocked = true;
      if (achievement.id === 'income_1000' && incomeGenerated >= 1000) unlocked = true;
      if (achievement.id === 'income_5000' && incomeGenerated >= 5000) unlocked = true;
      if (achievement.id === 'income_10000' && incomeGenerated >= 10000) unlocked = true;

      // Check expense achievements
      if (achievement.id === 'expense_reduced_100' && expenseReduction >= 100) unlocked = true;
      if (achievement.id === 'expense_reduced_500' && expenseReduction >= 500) unlocked = true;
      if (achievement.id === 'expense_reduced_1000' && expenseReduction >= 1000) unlocked = true;

      // Check fitness achievements
      if (achievement.id === 'gym_first' && gymSessions > 0) unlocked = true;
      if (achievement.id === 'gym_goal' && gymSessions >= 12) unlocked = true;

      // Check learning achievements
      if (achievement.id === 'language_first' && languageSessions > 0) unlocked = true;

      // Check consistency achievements
      if (achievement.id === 'report_first' && reportsGenerated >= 1) unlocked = true;
      if (achievement.id === 'report_5' && reportsGenerated >= 5) unlocked = true;
      if (achievement.id === 'tracking_7_days' && daysTracking >= 7) unlocked = true;
      if (achievement.id === 'tracking_30_days' && daysTracking >= 30) unlocked = true;
      if (achievement.id === 'tracking_90_days' && daysTracking >= 90) unlocked = true;

      // Check balance achievements
      if (achievement.id === 'balance_positive' && netBalance > 0) unlocked = true;
      if (achievement.id === 'balance_1000_surplus' && netBalance >= 1000) unlocked = true;

      if (unlocked) {
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      const newIds = newlyUnlocked.map(a => a.id);
      setUnlockedAchievements([...unlockedAchievements, ...newIds]);
      setNewAchievements(newlyUnlocked);
      
      const pointsEarned = newlyUnlocked.reduce((sum, a) => sum + a.points, 0);
      setTotalPoints(totalPoints + pointsEarned);

      // Show celebration
      showAchievementCelebration(newlyUnlocked[0]);
    }
  };

  const showAchievementCelebration = (achievement) => {
    setCelebrationMessage(`${achievement.icon} ${achievement.title}! +${achievement.points} points`);
    setShowCelebration(true);
    
    // Play sound effect (if you add audio)
    // new Audio('/achievement.mp3').play();

    setTimeout(() => {
      setShowCelebration(false);
      setNewAchievements([]);
    }, 5000);
  };

  const getProgressToNextLevel = () => {
    const currentLevelIndex = levels.findIndex(l => l.level === currentLevel.level);
    const nextLevel = levels[currentLevelIndex + 1];
    
    if (!nextLevel) return 100;
    
    const pointsIntoLevel = totalPoints - currentLevel.minPoints;
    const pointsNeeded = nextLevel.minPoints - currentLevel.minPoints;
    return (pointsIntoLevel / pointsNeeded) * 100;
  };

  const getNextLevel = () => {
    const currentLevelIndex = levels.findIndex(l => l.level === currentLevel.level);
    return levels[currentLevelIndex + 1];
  };

  const getCategoryProgress = (category) => {
    const categoryAchievements = achievements.filter(a => a.category === category);
    const unlocked = categoryAchievements.filter(a => unlockedAchievements.includes(a.id)).length;
    return (unlocked / categoryAchievements.length) * 100;
  };

  return (
    <div className="gamification-container">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <div className="celebration-icon">🎉</div>
            <div className="celebration-message">{celebrationMessage}</div>
            <div className="confetti">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)]
                }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card gamification-card">
        <h2>🎮 Your Progress</h2>

        {/* Level Display */}
        <div className="level-display">
          <div className="level-icon">{currentLevel.icon}</div>
          <div className="level-info">
            <div className="level-title">
              Level {currentLevel.level}: {currentLevel.title}
            </div>
            <div className="level-points">{totalPoints.toLocaleString()} points</div>
          </div>
        </div>

        {/* Progress to Next Level */}
        {getNextLevel() && (
          <div className="level-progress">
            <div className="progress-header">
              <span>Next: {getNextLevel().title}</span>
              <span>{getNextLevel().minPoints - totalPoints} points to go</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${getProgressToNextLevel()}%`,
                  backgroundColor: currentLevel.color 
                }}
              />
            </div>
          </div>
        )}

        {/* Category Progress */}
        <div className="category-progress">
          <h3>Achievement Categories</h3>
          <div className="category-grid">
            {['debt', 'savings', 'income', 'expense', 'fitness', 'learning', 'consistency', 'balance'].map(category => {
              const progress = getCategoryProgress(category);
              const categoryAchievements = achievements.filter(a => a.category === category);
              const unlocked = categoryAchievements.filter(a => unlockedAchievements.includes(a.id)).length;
              
              return (
                <div key={category} className="category-item">
                  <div className="category-name">{category}</div>
                  <div className="category-stats">{unlocked}/{categoryAchievements.length}</div>
                  <div className="mini-progress-bar">
                    <div className="mini-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="recent-achievements">
            <h3>Recent Achievements</h3>
            <div className="achievements-grid">
              {achievements
                .filter(a => unlockedAchievements.includes(a.id))
                .slice(-6)
                .reverse()
                .map(achievement => (
                  <div key={achievement.id} className="achievement-card unlocked">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-points">+{achievement.points}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Achievements */}
        <div className="all-achievements">
          <h3>All Achievements ({unlockedAchievements.length}/{achievements.length})</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              return (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  title={achievement.description}
                >
                  <div className="achievement-icon">{isUnlocked ? achievement.icon : '🔒'}</div>
                  <div className="achievement-title">{isUnlocked ? achievement.title : '???'}</div>
                  <div className="achievement-description">
                    {isUnlocked ? achievement.description : 'Keep going to unlock!'}
                  </div>
                  <div className="achievement-points">
                    {isUnlocked ? `+${achievement.points}` : `${achievement.points} pts`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
