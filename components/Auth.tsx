import React from 'react';
import { signIn } from '../firebase';

const Auth: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* Top/Center Branding Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-32 h-32 mb-8 relative">
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-3xl rotate-6 transform transition-transform group-hover:rotate-12"></div>
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
             <img 
              src="logo.png" 
              alt="Ngwe Mat Su Logo" 
              className="w-full h-full object-contain p-2" 
              onError={(e) => {
                // Fallback styling if image missing
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('p-6');
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('svg')) {
                   parent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H6a2 2 0 0 1-2-2Z"/><path d="M12 12v6"/><path d="M16 12v6"/></svg>';
                }
              }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Ngwe Mat Su</h1>
          <h2 className="text-2xl text-primary font-bold">ငွေမှတ်စု</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mt-4 leading-relaxed">
            Your smart companion for tracking daily expenses and income effortlessly.
          </p>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="w-full max-w-md mx-auto p-8 pb-12 animate-slide-up">
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-gray-200/50 dark:shadow-none active:scale-95"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          <span>Continue with Google</span>
        </button>
        
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;