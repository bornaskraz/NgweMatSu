import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Check, Loader2, Calendar } from 'lucide-react';
import { CATEGORIES, TRANSLATIONS } from '../constants';
import { TransactionType, Language } from '../types';
import { parseTransactionFromText } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  lang: Language;
}

const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose, onSave, lang }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('others');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      // @ts-ignore
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'my-MM'; // Myanmar Language
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleAIProcessing(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const handleAIProcessing = async (text: string) => {
    setIsProcessing(true);
    try {
      const result = await parseTransactionFromText(text);
      if (result) {
        if (result.amount) setAmount(result.amount.toString());
        if (result.description) setDescription(result.description);
        if (result.type) setType(result.type);
        if (result.category) {
            // Try to match returned category string to our ID keys roughly
            const catLower = result.category.toLowerCase();
            const foundCat = CATEGORIES[result.type].find((c: any) => catLower.includes(c.id) || c.label.en.toLowerCase().includes(catLower));
            if (foundCat) setCategory(foundCat.id);
        }
      }
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    await onSave({
      amount: parseFloat(amount),
      description,
      type,
      category,
      date,
      note
    });
    
    // Reset
    setAmount('');
    setDescription('');
    setNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t.addTransaction}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* AI Voice Button - The "Magical" part */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center border-b border-gray-100 dark:border-gray-700">
          <button 
            type="button"
            onClick={toggleListening}
            disabled={isProcessing}
            className={`
              relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300
              ${isListening ? 'bg-red-500 scale-110 shadow-red-500/50 animate-pulse' : 'bg-primary hover:bg-primary-dark'}
              ${isProcessing ? 'bg-blue-500' : ''}
            `}
          >
            {isProcessing ? (
              <Loader2 className="text-white animate-spin" size={28} />
            ) : (
              <Mic className="text-white" size={28} />
            )}
            
            {/* Ripple Effect ring */}
            {isListening && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
            )}
          </button>
          <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
             {isProcessing ? t.processing : isListening ? t.listening : "Tap to speak (Myanmar)"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Type Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${type === 'income' ? 'bg-white dark:bg-gray-600 text-primary shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {t.income}
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${type === 'expense' ? 'bg-white dark:bg-gray-600 text-danger shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {t.expense}
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">{t.amount}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
              className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none py-2 text-gray-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">{t.description}</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none text-gray-900 dark:text-white appearance-none"
              >
                {CATEGORIES[type].map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {lang === 'mm' ? cat.label.mm : cat.label.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">{t.date}</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 outline-none text-gray-900 dark:text-white"
                />
                <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase">{t.note}</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Check size={20} />
            {t.save}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
