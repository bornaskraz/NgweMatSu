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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-900 flex flex-col items-center justify-center p-6">
      
      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center relative z-10 animate-fade-in-up">
        
        {/* Logo Container */}
        <div className="mb-6 relative group">
          <div className="absolute -inset-1 bg-white/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3">
             {/* v=5 added to force browser to load the new image if cached */}
             <img 
              src="/logo.png?v=5" 
              alt="Ngwe Mat Su Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide drop-shadow-md">
          Welcome Back
        </h1>
        <p className="text-emerald-100 text-lg font-medium mb-10 tracking-wide opacity-90">
          Ngwe Mat Su
        </p>

        {/* Google Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-emerald-900 font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all transform flex items-center justify-center gap-3"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6" 
          />
          <span>Continue with Google</span>
        </button>

        {/* Security Badge */}
        <div className="mt-8 flex items-center gap-2 text-xs text-emerald-100/60">
           <ShieldCheck size={14} />
           <span>Secure & Encrypted</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center z-10">
        <p className="text-sm text-white/40 font-light">
          &copy; {new Date().getFullYear()} Ngwe Mat Su. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Auth;