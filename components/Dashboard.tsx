import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from 'lucide-react';
import { Transaction, DashboardStats, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  transactions: Transaction[];
  userDisplayName: string;
  lang: Language;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard: React.FC<Props> = ({ transactions, userDisplayName, lang }) => {
  const t = TRANSLATIONS[lang];

  // Calculate stats
  const stats = useMemo<DashboardStats>(() => {
    let income = 0;
    let expense = 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
        if (tx.type === 'income') income += tx.amount;
        else expense += tx.amount;
      }
    });

    return {
      totalBalance: income - expense,
      monthlyIncome: income,
      monthlyExpense: expense
    };
  }, [transactions]);

  // Chart Data
  const chartData = useMemo(() => {
    const categories: Record<string, number> = {};
    const currentMonth = new Date().getMonth();
    
    transactions
      .filter(tx => tx.type === 'expense' && new Date(tx.date).getMonth() === currentMonth)
      .forEach(tx => {
        categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
      });

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const budgetPercentage = stats.monthlyIncome > 0 
    ? Math.min((stats.monthlyExpense / stats.monthlyIncome) * 100, 100) 
    : 0;

  const budgetColor = budgetPercentage < 80 ? 'bg-primary' : budgetPercentage < 100 ? 'bg-orange-500' : 'bg-red-500';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greetingMorning;
    if (hour < 18) return t.greetingAfternoon;
    return t.greetingEvening;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Greeting Header */}
      <div className="flex justify-between items-end px-2">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{getGreeting()},</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userDisplayName}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
           {/* Placeholder avatar if needed */}
           <div className="w-full h-full flex items-center justify-center text-gray-400">
             <Wallet size={20} />
           </div>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet size={120} />
        </div>
        <p className="text-gray-400 text-sm mb-1">{t.totalBalance}</p>
        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          {stats.totalBalance.toLocaleString()} <span className="text-lg font-normal text-gray-400">MMK</span>
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1 text-green-400">
              <div className="p-1 bg-green-400/20 rounded-full"><TrendingUp size={14} /></div>
              <span className="text-xs font-semibold">{t.income}</span>
            </div>
            <p className="font-bold text-lg">{stats.monthlyIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1 text-red-400">
              <div className="p-1 bg-red-400/20 rounded-full"><TrendingDown size={14} /></div>
              <span className="text-xs font-semibold">{t.expense}</span>
            </div>
            <p className="font-bold text-lg">{stats.monthlyExpense.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <AlertCircle size={16} className="text-primary" />
            {t.budgetHealth}
          </h3>
          <span className="text-sm font-bold text-gray-500">{budgetPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${budgetColor}`} 
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">Based on monthly income</p>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-72">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Spending Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;