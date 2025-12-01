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
    // Outer container for centering on desktop
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-0 sm:p-4 font-sans">
      
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-emerald-800 h-[100dvh] sm:h-[850px] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative ring-8 ring-black/5">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 to-emerald-900 z-0"></div>
        
        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-20%] w-96 h-96 bg-emerald-400 rounded-full blur-[80px] opacity-20 z-0 animate-blob"></div>
        <div className="absolute bottom-[40%] right-[-10%] w-80 h-80 bg-teal-300 rounded-full blur-[80px] opacity-10 z-0"></div>

        {/* Top Section (65%) */}
        <div className="flex-[1.8] flex flex-col items-center justify-center relative z-10 p-8 pb-16">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-emerald-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
            
            {/* Logo Container */}
            <div className="relative w-32 h-32 bg-white/10 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/20 flex items-center justify-center p-4">
              <img 
                src="/logo.jpg" 
                alt="Ngwe Mat Su Logo" 
                className="w-full h-full object-cover rounded-[1.2rem] shadow-inner" 
              />
            </div>
          </div>
        </div>

        {/* Bottom Section (35%) */}
        <div className="bg-white w-full relative z-20 flex flex-col rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] animate-fade-in-up">
           
           {/* Handle bar */}
           <div className="w-full flex justify-center pt-5 pb-2">
             <div className="w-12 h-1.5 bg-gray-200 rounded-full opacity-50"></div>
           </div>

           <div className="px-8 pt-2 pb-10 flex flex-col h-full justify-between">
              
              {/* Text Header */}
              <div className="text-center mt-2">
                <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-3 block">Mingalarpar</span>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Ngwe Mat Su</h1>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  သင့်ငွေကြေးများကို စနစ်တကျ စီမံခန့်ခွဲပါ
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-6 mb-4">
                <button
                  onClick={handleLogin}
                  className="w-full bg-gray-900 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-xl shadow-gray-200 hover:bg-black hover:scale-[1.01] transition-all flex items-center justify-center gap-3 active:scale-[0.98] group"
                >
                  <div className="bg-white p-1.5 rounded-full group-hover:rotate-12 transition-transform">
                    <img 
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                      alt="G" 
                      className="w-5 h-5" 
                    />
                  </div>
                  <span>Sign in with Google</span>
                </button>

                <div className="flex justify-center">
                   <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      <span>Secure • Private • Smart</span>
                   </div>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;