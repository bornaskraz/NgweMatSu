import React, { useState } from 'react';
import { Transaction, Language, TransactionType } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../constants';
import { Search, Trash2, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  lang: Language;
}

const TransactionList: React.FC<Props> = ({ transactions, onDelete, lang }) => {
  const [filter, setFilter] = useState<'all' | TransactionType>('all');
  const t = TRANSLATIONS[lang];

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const getCategoryIcon = (tx: Transaction) => {
    const list = CATEGORIES[tx.type];
    const cat = list.find(c => c.id === tx.category);
    // In a real app, dynamic icon rendering would happen here using lucide-react map
    // For now, we return a generic indicator based on type
    return tx.type === 'income' ? <ArrowDownLeft className="text-green-500" /> : <ArrowUpRight className="text-red-500" />;
  };

  const getCategoryLabel = (tx: Transaction) => {
    const list = CATEGORIES[tx.type];
    const cat = list.find(c => c.id === tx.category);
    return cat ? (lang === 'mm' ? cat.label.mm : cat.label.en) : tx.category;
  };

  return (
    <div className="pb-20 space-y-4 h-full">
      <div className="flex items-center justify-between px-2 pt-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.list}</h2>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['all', 'income', 'expense'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                filter === f 
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {f === 'all' ? t.all : (f === 'income' ? t.income : t.expense)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Filter className="mx-auto mb-2 opacity-50" size={40} />
            <p>No transactions found.</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div 
              key={tx.id}
              className="group bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'income' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {getCategoryIcon(tx)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">{tx.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex gap-2">
                    <span>{getCategoryLabel(tx)}</span>
                    <span>•</span>
                    <span>{format(new Date(tx.date), 'MMM d, yyyy')}</span>
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'income' ? 'text-primary' : 'text-danger'}`}>
                  {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()}
                </p>
                <button 
                  onClick={() => {
                    if(window.confirm(t.confirmDelete)) onDelete(tx.id);
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors mt-1 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
