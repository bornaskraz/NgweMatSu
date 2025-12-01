import React from 'react';
import { signIn } from '../firebase';
import { ShieldCheck } from 'lucide-react';

const Auth: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">
      
      {/* Main Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center animate-fade-in-up border border-slate-100">
        
        {/* Logo Container */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
             {/* Updated to use logo.jpg with cache buster */}
             <img 
              src="/logo.jpg?v=6" 
              alt="Ngwe Mat Su Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-emerald-700 mb-2 tracking-tight">
          Ngwe Mat Su
        </h1>
        <p className="text-gray-500 text-sm mb-8 font-sans">
          သင့်ငွေကြေးများကို စနစ်တကျ စီမံခန့်ခွဲပါ
        </p>

        {/* Google Button - Official Style */}
        <button
          onClick={handleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-3 group"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-5 h-5 group-hover:scale-110 transition-transform" 
          />
          <span>Sign in with Google</span>
        </button>

        {/* Footer / Trust Badge */}
        <div className="mt-8 pt-6 border-t border-gray-100 w-full flex flex-col gap-2 items-center">
           <div className="flex items-center gap-1.5 text-xs text-emerald-600/80 bg-emerald-50 px-3 py-1 rounded-full">
              <ShieldCheck size={12} />
              <span className="font-medium">Secure & Private</span>
           </div>
           <p className="text-[10px] text-gray-400 mt-2">
             &copy; {new Date().getFullYear()} Ngwe Mat Su. All rights reserved.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;