
import React, { useState } from 'react';
import { signIn } from '../firebase';
import { Wallet } from 'lucide-react';

const Auth: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col bg-emerald-900 overflow-hidden font-sans">
      
      {/* Top Section - 65% Height - Emerald Gradient */}
      <div className="h-[65%] w-full bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center relative">
        {/* Abstract Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-300/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Logo Container */}
        <div className="relative z-10 animate-fade-in-up">
          <div className="w-32 h-32 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(16,185,129,0.3)] p-5 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-75 transition-opacity"></div>
            
            {/* Logic: Point specifically to the src/assets folder with relative dot */}
            {!imageError ? (
              <img 
                src="./src/assets/app_logo.jpg" 
                alt="Ngwe Mat Su Logo" 
                className="w-full h-full object-cover rounded-xl shadow-lg drop-shadow-md relative z-10"
                onError={(e) => {
                  console.error("Image failed to load:", e.currentTarget.src);
                  setImageError(true);
                }}
              />
            ) : (
              <Wallet className="w-full h-full text-white relative z-10" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - 35% Height - White Sheet */}
      <div className="h-[35%] w-full bg-white rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] flex flex-col items-center pt-12 px-8 relative z-20 animate-slide-up">
        
        {/* Text Content */}
        <div className="text-center w-full">
          <h2 className="text-emerald-600 font-semibold text-lg tracking-wide mb-1">Mingalarpar</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ngwe Mat Su</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Smart Voice Expense Tracker</p>
        </div>

        {/* Action Button - Pushed to Bottom */}
        <div className="mt-auto mb-8 w-full max-w-sm">
          <button
            onClick={handleLogin}
            className="w-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-lg h-14 rounded-full shadow-2xl shadow-slate-900/30 transition-all flex items-center justify-center gap-3"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-6 h-6" 
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
