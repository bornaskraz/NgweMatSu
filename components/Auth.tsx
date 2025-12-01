import React from 'react';
import { signIn } from '../firebase';

const Auth: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col items-center justify-between overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs mx-auto z-10 animate-fade-in-up">
        
        {/* Logo Container */}
        <div className="relative mb-10 group">
          {/* Outer Glow Ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-slate-500 rounded-3xl opacity-30 blur-sm group-hover:opacity-60 transition duration-700"></div>
          
          {/* Glass Card */}
          <div className="relative w-32 h-32 bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
             <img 
              src="/logo.jpg" 
              alt="Ngwe Mat Su Logo" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Ngwe Mat Su
          </h1>
          <p className="text-gray-400 text-base font-medium tracking-wide">
            Your Smart Digital Financer
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-md px-6 pb-12 z-20">
        <button
          onClick={handleLogin}
          className="w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-slate-900 font-bold text-lg h-14 rounded-full shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] transition-all transform active:scale-95 flex items-center justify-center gap-3 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6" 
          />
          <span>Sign in with Google</span>
        </button>
        
        <p className="text-center text-slate-600 text-xs mt-6 font-medium">
          Protected by Bank-Grade Security
        </p>
      </div>
    </div>
  );
};

export default Auth;