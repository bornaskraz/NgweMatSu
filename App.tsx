import React, { useState, useEffect } from 'react';
import { auth, logout } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { UserProfile, Transaction, Language, ThemeMode } from './types';
import { getTransactions, addTransaction, deleteTransaction } from './services/transactionService';
import { TRANSLATIONS } from './constants';

import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';

// Icon imports for Settings
import { Moon, Sun, Globe, LogOut, Download } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'settings'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Preferences
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem('theme') as ThemeMode) || 'light');

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data Listener
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        try {
          const data = await getTransactions(user.uid);
          setTransactions(data);
        } catch (e) {
          console.error("Fetch failed", e);
        }
      };
      fetch();
    }
  }, [user]);

  // Theme Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Lang Effect
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const handleAddTransaction = async (data: Omit<Transaction, "id" | "userId" | "createdAt">) => {
    if (!user) return;
    try {
      const newTx = await addTransaction({
        ...data,
        userId: user.uid,
        createdAt: Date.now()
      });
      // Optimistic update
      setTransactions(prev => [newTx as Transaction, ...prev]);
    } catch (error) {
      alert("Failed to save transaction.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      alert("Failed to delete.");
    }
  };

  const handleExportCSV = () => {
    // BOM for Excel support
    const BOM = "\uFEFF"; 
    const headers = ["Date", "Description", "Category", "Type", "Amount", "Note"];
    const rows = transactions.map(tx => [
      tx.date,
      `"${tx.description.replace(/"/g, '""')}"`, // Escape quotes
      tx.category,
      tx.type,
      tx.amount,
      `"${(tx.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ngwe_mat_su_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  if (!user) return <Auth />;

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onOpenAdd={() => setIsModalOpen(true)}
      lang={lang}
    >
      {activeTab === 'dashboard' && (
        <Dashboard 
          transactions={transactions} 
          userDisplayName={user.displayName || 'User'} 
          lang={lang}
        />
      )}

      {activeTab === 'list' && (
        <TransactionList 
          transactions={transactions} 
          onDelete={handleDelete}
          lang={lang}
        />
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{TRANSLATIONS[lang].settings}</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Globe className="text-gray-500" size={20} />
                <span className="text-gray-700 dark:text-gray-200">{TRANSLATIONS[lang].language}</span>
              </div>
              <button 
                onClick={() => setLang(l => l === 'en' ? 'mm' : 'en')}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium"
              >
                {lang === 'en' ? 'English' : 'မြန်မာ'}
              </button>
            </div>

            <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {theme === 'light' ? <Sun className="text-gray-500" size={20} /> : <Moon className="text-gray-500" size={20} />}
                <span className="text-gray-700 dark:text-gray-200">{TRANSLATIONS[lang].darkMode}</span>
              </div>
              <button 
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="text-gray-500" size={20} />
                <span className="text-gray-700 dark:text-gray-200">{TRANSLATIONS[lang].exportCsv}</span>
              </div>
              <button onClick={handleExportCSV} className="text-primary font-medium text-sm">Download</button>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center justify-center gap-2 font-medium"
          >
            <LogOut size={20} />
            {TRANSLATIONS[lang].signOut}
          </button>
        </div>
      )}

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTransaction}
        lang={lang}
      />
    </Layout>
  );
};

export default App;
