export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string; // ISO String YYYY-MM-DD
  createdAt: number; // Timestamp
  note?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export type ThemeMode = 'light' | 'dark';

export type Language = 'en' | 'mm';

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}