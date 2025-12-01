import React from 'react';
import { signIn } from '../firebase';
import { Wallet } from 'lucide-react';

const Auth: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full">
            <Wallet className="w-12 h-12 text-primary dark:text-primary-dark" />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ngwe Mat Su</h1>
          <h2 className="text-xl text-primary font-semibold mb-4">ငွေမှတ်စု</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Smart financial tracking for your daily life.
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-medium py-3 px-4 rounded-xl transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
