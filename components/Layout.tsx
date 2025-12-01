import React from 'react';
import { Home, List, Settings, Plus } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'list' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'list' | 'settings') => void;
  onOpenAdd: () => void;
  lang: Language;
}

const Layout: React.FC<Props> = ({ children, activeTab, setActiveTab, onOpenAdd, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 relative shadow-2xl overflow-hidden flex flex-col">
      <main className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe pt-2 px-6">
        <div className="flex justify-between items-center h-16">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-gray-400'}`}
          >
            <Home size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{t.dashboard}</span>
          </button>

          <button 
            onClick={() => setActiveTab('list')}
            className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'list' ? 'text-primary' : 'text-gray-400'}`}
          >
            <List size={24} strokeWidth={activeTab === 'list' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{t.list}</span>
          </button>

          {/* Floating Action Button (FAB) Space Holder */}
          <div className="w-16"></div>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'settings' ? 'text-primary' : 'text-gray-400'}`}
          >
            <Settings size={24} strokeWidth={activeTab === 'settings' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{t.settings}</span>
          </button>
        </div>
      </div>

      {/* Actual FAB */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={onOpenAdd}
          className="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg shadow-primary/40 transition-transform active:scale-95 hover:-translate-y-1"
        >
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
};

export default Layout;
