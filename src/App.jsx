import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import SummaryCards from './components/SummaryCards';
import IncomeManager from './components/IncomeManager';
import ExpenseManager from './components/ExpenseManager';
import IncomeIdeas from './components/IncomeIdeas';
import GoalsTracker from './components/GoalsTracker';
import GymTracker from './components/GymTracker';
import LanguageTracker from './components/LanguageTracker';
import ReportGenerator from './components/ReportGenerator';
import MotivationalQuote from './components/MotivationalQuote';
import UnexpectedTransactions from './components/UnexpectedTransactions';
import Gamification from './components/Gamification';
import InstallPrompt from './components/InstallPrompt';

const initialExpenses = {
  fixed: [
    { id: 1, name: 'Rent', amount: 8700, category: 'Housing' },
    { id: 2, name: 'Car Payment', amount: 8000, category: 'Transportation' },
    { id: 3, name: 'Petrol', amount: 2500, category: 'Transportation' },
    { id: 4, name: 'Internet', amount: 450, category: 'Utilities' },
    { id: 5, name: 'Electricity', amount: 500, category: 'Utilities' },
    { id: 6, name: 'Phone SIM', amount: 70, category: 'Utilities' },
    { id: 7, name: 'iCloud Storage', amount: 90, category: 'Subscriptions' },
    { id: 8, name: 'Phone Insurance', amount: 240, category: 'Insurance' },
    { id: 9, name: 'Children Donation', amount: 250, category: 'Charity' },
    { id: 10, name: 'Car Tracker', amount: 210, category: 'Transportation' },
    { id: 11, name: 'Banking Fees', amount: 150, category: 'Banking' },
    { id: 12, name: 'Food', amount: 2000, category: 'Food' },
    { id: 13, name: 'Netflix', amount: 100, category: 'Subscriptions' }
  ],
  variable: [
    { id: 14, name: 'Payflex', amount: 2200, category: 'Debt', note: 'May - can decrease' },
    { id: 15, name: 'Tablet Payment', amount: 220, category: 'Debt', note: 'Can be paid off soon' }
  ]
};

function App() {
  const [currentSalary, setCurrentSalary] = useState(29500);
  const [additionalIncome, setAdditionalIncome] = useState([]);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [incomeIdeas, setIncomeIdeas] = useState([]);
  const [debtRemaining, setDebtRemaining] = useState(30000);
  const [emergencyFund, setEmergencyFund] = useState(0);
  const [unexpectedTransactions, setUnexpectedTransactions] = useState([]);
  const [gymData, setGymData] = useState({ sessions: [], goal: 12 });
  const [languageData, setLanguageData] = useState({ sessions: [], goal: 30 });
  const [reportsGenerated, setReportsGenerated] = useState(0);
  const [initialExpenseTotal, setInitialExpenseTotal] = useState(0);
  const [firstLoadDate, setFirstLoadDate] = useState(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  
  // Refs for scrolling
  const dashboardRef = useRef(null);
  const incomeRef = useRef(null);
  const expensesRef = useRef(null);
  const goalsRef = useRef(null);
  const ideasRef = useRef(null);
  const fitnessRef = useRef(null);
  const learningRef = useRef(null);
  const achievementsRef = useRef(null);
  const reportsRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('financialDashboardData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setCurrentSalary(data.currentSalary || 29500);
        setAdditionalIncome(data.additionalIncome || []);
        setExpenses(data.expenses || initialExpenses);
        setIncomeIdeas(data.incomeIdeas || []);
        setDebtRemaining(data.debtRemaining || 30000);
        setEmergencyFund(data.emergencyFund || 0);
        setUnexpectedTransactions(data.unexpectedTransactions || []);
        setGymData(data.gymData || { sessions: [], goal: 12 });
        setLanguageData(data.languageData || { sessions: [], goal: 30 });
        setReportsGenerated(data.reportsGenerated || 0);
        setInitialExpenseTotal(data.initialExpenseTotal || 0);
        setFirstLoadDate(data.firstLoadDate || new Date().toISOString());
      } catch (error) {
        console.error('Error loading data:', error);
      }
    } else {
      // First time user - set initial values
      const initialTotal = 
        initialExpenses.fixed.reduce((sum, exp) => sum + exp.amount, 0) +
        initialExpenses.variable.reduce((sum, exp) => sum + exp.amount, 0);
      setInitialExpenseTotal(initialTotal);
      setFirstLoadDate(new Date().toISOString());
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const dataToSave = {
      currentSalary,
      additionalIncome,
      expenses,
      incomeIdeas,
      debtRemaining,
      emergencyFund,
      unexpectedTransactions,
      gymData,
      languageData,
      reportsGenerated,
      initialExpenseTotal,
      firstLoadDate,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('financialDashboardData', JSON.stringify(dataToSave));
  }, [currentSalary, additionalIncome, expenses, incomeIdeas, debtRemaining, emergencyFund, unexpectedTransactions, gymData, languageData, reportsGenerated, initialExpenseTotal, firstLoadDate]);

  // Calculate totals
  const totalIncome = currentSalary + 
    additionalIncome.reduce((sum, income) => sum + income.amount, 0) +
    unexpectedTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = 
    expenses.fixed.reduce((sum, exp) => sum + exp.amount, 0) +
    expenses.variable.reduce((sum, exp) => sum + exp.amount, 0) +
    unexpectedTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  // Calculate gamification stats
  const debtPaid = 30000 - debtRemaining;
  
  const incomeGenerated = incomeIdeas.reduce((sum, idea) => {
    if (idea.entries) {
      return sum + idea.entries.reduce((entrySum, entry) => entrySum + entry.moneyGenerated, 0);
    }
    return sum;
  }, 0);

  const currentExpenseTotal = 
    expenses.fixed.reduce((sum, exp) => sum + exp.amount, 0) +
    expenses.variable.reduce((sum, exp) => sum + exp.amount, 0);
  const expenseReduction = Math.max(0, initialExpenseTotal - currentExpenseTotal);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthGymSessions = gymData.sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  }).length;

  const monthLanguageSessions = languageData.sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
  }).length;

  const daysTracking = firstLoadDate 
    ? Math.floor((new Date() - new Date(firstLoadDate)) / (1000 * 60 * 60 * 24))
    : 0;

  // Navigation handler
  const handleNavigate = (sectionId) => {
    setCurrentSection(sectionId);
    const refs = {
      dashboard: dashboardRef,
      income: incomeRef,
      expenses: expensesRef,
      goals: goalsRef,
      ideas: ideasRef,
      fitness: fitnessRef,
      learning: learningRef,
      achievements: achievementsRef,
      reports: reportsRef
    };
    
    const ref = refs[sectionId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      <InstallPrompt />
      <MobileNav onNavigate={handleNavigate} currentSection={currentSection} />
      <Header />
      <div className="container">
        <div ref={dashboardRef} className="section-anchor">
          <MotivationalQuote />
          
          <SummaryCards
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
            debtRemaining={debtRemaining}
          />
        </div>

        <div ref={incomeRef} className="section-anchor">
          <div className="grid-2">
            <IncomeManager
              currentSalary={currentSalary}
              setCurrentSalary={setCurrentSalary}
              additionalIncome={additionalIncome}
              setAdditionalIncome={setAdditionalIncome}
            />
            
            <UnexpectedTransactions
              transactions={unexpectedTransactions}
              setTransactions={setUnexpectedTransactions}
            />
          </div>
        </div>

        <div ref={expensesRef} className="section-anchor">
          <ExpenseManager
            expenses={expenses}
            setExpenses={setExpenses}
          />
        </div>

        <div ref={ideasRef} className="section-anchor">
          <IncomeIdeas
            incomeIdeas={incomeIdeas}
            setIncomeIdeas={setIncomeIdeas}
          />
        </div>

        <div ref={goalsRef} className="section-anchor">
          <GoalsTracker
            debtRemaining={debtRemaining}
            setDebtRemaining={setDebtRemaining}
            emergencyFund={emergencyFund}
            setEmergencyFund={setEmergencyFund}
          />
        </div>

        <div ref={fitnessRef} className="section-anchor">
          <div className="grid-2">
            <GymTracker
              gymData={gymData}
              setGymData={setGymData}
            />
            
            <div ref={learningRef}>
              <LanguageTracker
                languageData={languageData}
                setLanguageData={setLanguageData}
              />
            </div>
          </div>
        </div>

        <div ref={reportsRef} className="section-anchor">
          <ReportGenerator
            currentSalary={currentSalary}
            additionalIncome={additionalIncome}
            expenses={expenses}
            incomeIdeas={incomeIdeas}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
            debtRemaining={debtRemaining}
            emergencyFund={emergencyFund}
            unexpectedTransactions={unexpectedTransactions}
            gymData={gymData}
            languageData={languageData}
            onReportGenerated={() => setReportsGenerated(reportsGenerated + 1)}
          />
        </div>

        <div ref={achievementsRef} className="section-anchor">
          <Gamification
            debtPaid={debtPaid}
            emergencyFund={emergencyFund}
            incomeGenerated={incomeGenerated}
            expenseReduction={expenseReduction}
            gymSessions={monthGymSessions}
            languageSessions={monthLanguageSessions}
            reportsGenerated={reportsGenerated}
            netBalance={netBalance}
            daysTracking={daysTracking}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
