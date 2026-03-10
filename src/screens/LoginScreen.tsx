import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

interface Props {
  onLogin: (phone: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [phone, setPhone] = useState('');

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <div className="h-[45%] relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/delivery-login/800/800" 
          alt="Login" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-bg to-transparent" />
        
        <div className="absolute top-16 left-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-primary font-bold text-xl">ZN</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome to<br />ZYNROVA Nest</h1>
        </div>
      </div>

      <div className="flex-1 px-8 -mt-12 relative z-10">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="premium-card p-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Login or Signup</h2>
          
          <div className="space-y-4 mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Phone size={20} />
              </div>
              <div className="absolute left-12 top-1/2 -translate-y-1/2 text-slate-800 font-medium">
                +91
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-24 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
              />
            </div>

            <button
              onClick={() => phone.length >= 10 && onLogin(phone)}
              disabled={phone.length < 10}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              Continue
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 bg-white text-slate-400 text-sm">or continue with</span>
          </div>

          <button className="w-full py-4 border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Google
          </button>
        </motion.div>

        <p className="text-center text-slate-400 text-xs mt-8 px-8">
          By continuing, you agree to our <span className="text-slate-600 font-medium underline">Terms of Service</span> and <span className="text-slate-600 font-medium underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
