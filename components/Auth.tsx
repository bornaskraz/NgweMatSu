import React from 'react';
import { signIn } from '../firebase';
import { ShieldCheck, Sparkles } from 'lucide-react';

const Auth: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-gray-900 flex flex-col items-center justify-center p-6">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center relative z-10 animate-fade-in-up">
        
        {/* Logo Container with Glow */}
        <div className="mb-8 relative group cursor-default">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative w-28 h-28 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
             {/* Added ?v=4 to force browser to load new logo */}
             <img 
              src="/logo.png?v=4" 
              alt="Ngwe Mat Su Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* Branding Text */}
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-sm">
          Ngwe Mat Su
        </h1>
        <h2 className="text-xl text-emerald-200 font-medium mb-6">
          ငွေမှတ်စု
        </h2>
        
        <p className="text-gray-200 text-sm mb-10 leading-relaxed max-w-xs opacity-90">
          Your personal AI financial companion. <br/>
          Smart tracking for a wealthier future.
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/20 active:scale-95 group"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6" 
          />
          <span className="font-semibold">Continue with Google</span>
        </button>

        {/* Security Badge */}
        <div className="mt-8 flex items-center gap-2 text-xs text-emerald-200/60">
           <ShieldCheck size={14} />
           <span>Secure & Encrypted</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Ngwe Mat Su. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Auth;