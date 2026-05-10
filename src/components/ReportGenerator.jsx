import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './ReportGenerator.css';

const ReportGenerator = ({
  currentSalary,
  additionalIncome,
  expenses,
  incomeIdeas,
  totalIncome,
  totalExpenses,
  netBalance,
  debtRemaining,
  emergencyFund,
  unexpectedTransactions,
  gymData,
  languageData,
  onReportGenerated
}) => {
  const [generating, setGenerating] = useState(false);

  const generatePDFReport = () => {
    setGenerating(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPos = 20;

      // Title
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('Monthly Financial Report', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 10;
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }), pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 15;

      // Financial Summary
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Financial Summary', 20, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text(`Total Income: R ${totalIncome.toLocaleString()}`, 20, yPos);
      yPos += 7;
      doc.text(`Total Expenses: R ${totalExpenses.toLocaleString()}`, 20, yPos);
      yPos += 7;
      doc.setFont(undefined, 'bold');
      doc.text(`Net Balance: R ${netBalance.toLocaleString()}`, 20, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      doc.text(`Credit Card Debt: R ${debtRemaining.toLocaleString()}`, 20, yPos);
      yPos += 7;
      doc.text(`Emergency Fund: R ${emergencyFund.toLocaleString()}`, 20, yPos);
      yPos += 15;

      // Income Breakdown
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Income Breakdown', 20, yPos);
      yPos += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text(`Salary: R ${currentSalary.toLocaleString()}`, 25, yPos);
      yPos += 7;

      if (additionalIncome.length > 0) {
        additionalIncome.forEach(income => {
          doc.text(`${income.source}: R ${income.amount.toLocaleString()}`, 25, yPos);
          yPos += 7;
        });
      }

      const unexpectedIncome = unexpectedTransactions.filter(t => t.type === 'income');
      if (unexpectedIncome.length > 0) {
        const totalUnexpected = unexpectedIncome.reduce((sum, t) => sum + t.amount, 0);
        doc.text(`Unexpected Income: R ${totalUnexpected.toLocaleString()}`, 25, yPos);
        yPos += 7;
      }

      yPos += 8;

      // Expense Breakdown
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Expense Breakdown', 20, yPos);
      yPos += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');

      const fixedTotal = expenses.fixed.reduce((sum, exp) => sum + exp.amount, 0);
      doc.text(`Fixed Expenses: R ${fixedTotal.toLocaleString()}`, 25, yPos);
      yPos += 7;

      const variableTotal = expenses.variable.reduce((sum, exp) => sum + exp.amount, 0);
      doc.text(`Variable Expenses: R ${variableTotal.toLocaleString()}`, 25, yPos);
      yPos += 7;

      const unexpectedExpenses = unexpectedTransactions.filter(t => t.type === 'expense');
      if (unexpectedExpenses.length > 0) {
        const totalUnexpected = unexpectedExpenses.reduce((sum, t) => sum + t.amount, 0);
        doc.text(`Unexpected Expenses: R ${totalUnexpected.toLocaleString()}`, 25, yPos);
        yPos += 7;
      }

      yPos += 8;

      // Top Expenses
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Top 5 Expenses', 20, yPos);
      yPos += 8;

      const allExpenses = [...expenses.fixed, ...expenses.variable]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      allExpenses.forEach((exp, index) => {
        doc.text(`${index + 1}. ${exp.name}: R ${exp.amount.toLocaleString()}`, 25, yPos);
        yPos += 7;
      });

      yPos += 8;

      // Income Ideas Progress
      if (incomeIdeas.length > 0) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Income Generation Progress', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');

        incomeIdeas.forEach(idea => {
          if (idea.entries && idea.entries.length > 0) {
            const totalTime = idea.entries.reduce((sum, e) => sum + e.timeSpent, 0);
            const totalInvested = idea.entries.reduce((sum, e) => sum + e.moneyInvested, 0);
            const totalGenerated = idea.entries.reduce((sum, e) => sum + e.moneyGenerated, 0);
            
            doc.text(`${idea.title}:`, 25, yPos);
            yPos += 6;
            doc.text(`  Time: ${totalTime}h | Invested: R${totalInvested} | Generated: R${totalGenerated}`, 30, yPos);
            yPos += 7;
          }
        });

        yPos += 8;
      }

      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Fitness & Learning
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Personal Development', 20, yPos);
      yPos += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');

      // Gym stats
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthGymSessions = gymData.sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
      });
      doc.text(`Gym Sessions This Month: ${monthGymSessions.length} / ${gymData.goal}`, 25, yPos);
      yPos += 7;

      // Language stats
      const monthLanguageSessions = languageData.sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
      });
      const monthMinutes = monthLanguageSessions.reduce((sum, s) => sum + s.duration, 0);
      doc.text(`Language Learning: ${monthMinutes} / ${languageData.goal} minutes`, 25, yPos);
      yPos += 15;

      // Recommendations
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Recommendations', 20, yPos);
      yPos += 8;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');

      const recommendations = [];
      
      if (netBalance < 0) {
        recommendations.push('• Reduce expenses or increase income to achieve positive balance');
      } else if (netBalance > 0) {
        recommendations.push(`• Great! You have R${netBalance.toLocaleString()} surplus this month`);
      }

      if (debtRemaining > 0) {
        const monthsToPayOff = Math.ceil(debtRemaining / 2500);
        recommendations.push(`• Focus on debt: ~${monthsToPayOff} months to pay off at R2,500/month`);
      }

      if (emergencyFund < 30000) {
        recommendations.push(`• Build emergency fund: R${(30000 - emergencyFund).toLocaleString()} remaining`);
      }

      if (monthGymSessions.length < gymData.goal) {
        recommendations.push(`• Increase gym frequency: ${gymData.goal - monthGymSessions.length} sessions needed`);
      }

      recommendations.forEach(rec => {
        doc.text(rec, 25, yPos);
        yPos += 7;
      });

      // Save PDF
      doc.save(`Financial-Report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      if (onReportGenerated) onReportGenerated();
      alert('✅ Report generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('❌ Error generating report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const generateTextReport = () => {
    let report = '='.repeat(50) + '\n';
    report += 'MONTHLY FINANCIAL REPORT\n';
    report += new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }) + '\n';
    report += '='.repeat(50) + '\n\n';

    report += 'FINANCIAL SUMMARY\n';
    report += '-'.repeat(50) + '\n';
    report += `Total Income:        R ${totalIncome.toLocaleString()}\n`;
    report += `Total Expenses:      R ${totalExpenses.toLocaleString()}\n`;
    report += `Net Balance:         R ${netBalance.toLocaleString()}\n`;
    report += `Credit Card Debt:    R ${debtRemaining.toLocaleString()}\n`;
    report += `Emergency Fund:      R ${emergencyFund.toLocaleString()}\n\n`;

    report += 'INCOME BREAKDOWN\n';
    report += '-'.repeat(50) + '\n';
    report += `Salary:              R ${currentSalary.toLocaleString()}\n`;
    additionalIncome.forEach(income => {
      report += `${income.source.padEnd(20)} R ${income.amount.toLocaleString()}\n`;
    });
    report += '\n';

    report += 'EXPENSE BREAKDOWN\n';
    report += '-'.repeat(50) + '\n';
    const fixedTotal = expenses.fixed.reduce((sum, exp) => sum + exp.amount, 0);
    const variableTotal = expenses.variable.reduce((sum, exp) => sum + exp.amount, 0);
    report += `Fixed Expenses:      R ${fixedTotal.toLocaleString()}\n`;
    report += `Variable Expenses:   R ${variableTotal.toLocaleString()}\n\n`;

    report += 'TOP 5 EXPENSES\n';
    report += '-'.repeat(50) + '\n';
    const allExpenses = [...expenses.fixed, ...expenses.variable]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
    allExpenses.forEach((exp, index) => {
      report += `${index + 1}. ${exp.name.padEnd(20)} R ${exp.amount.toLocaleString()}\n`;
    });
    report += '\n';

    report += 'PERSONAL DEVELOPMENT\n';
    report += '-'.repeat(50) + '\n';
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthGymSessions = gymData.sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
    });
    report += `Gym Sessions:        ${monthGymSessions.length} / ${gymData.goal}\n`;
    
    const monthLanguageSessions = languageData.sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
    });
    const monthMinutes = monthLanguageSessions.reduce((sum, s) => sum + s.duration, 0);
    report += `Language Learning:   ${monthMinutes} / ${languageData.goal} minutes\n`;

    // Download as text file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Financial-Report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    if (onReportGenerated) onReportGenerated();
  };

  return (
    <div className="card report-generator">
      <h2>📊 Monthly Report Generator</h2>
      
      <div className="report-info">
        <p>Generate a comprehensive monthly report with all your financial data, income ideas progress, and personal development tracking.</p>
      </div>

      <div className="report-preview">
        <h3>Report Includes:</h3>
        <ul>
          <li>✓ Financial summary (income, expenses, balance)</li>
          <li>✓ Income and expense breakdowns</li>
          <li>✓ Top expenses analysis</li>
          <li>✓ Debt and emergency fund status</li>
          <li>✓ Income generation progress</li>
          <li>✓ Gym and language learning stats</li>
          <li>✓ Personalized recommendations</li>
        </ul>
      </div>

      <div className="report-actions">
        <button
          className="btn btn-primary"
          onClick={generatePDFReport}
          disabled={generating}
        >
          {generating ? 'Generating...' : '📄 Generate PDF Report'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={generateTextReport}
        >
          📝 Generate Text Report
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;
