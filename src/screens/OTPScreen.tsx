import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onVerify: () => void;
  onBack: () => void;
}

export default function OTPScreen({ onVerify, onBack }: Props) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every(v => v !== '')) {
      // Auto verify if all filled
      setTimeout(onVerify, 500);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="h-full w-full bg-white px-8 pt-16 flex flex-col">
      <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-800 mb-8">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">Verify your phone</h1>
      <p className="text-slate-500 mb-12">Enter the 4 digit code sent to your number</p>

      <div className="flex justify-between gap-4 mb-12">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="number"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-16 h-16 text-center text-2xl font-bold bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
          />
        ))}
      </div>

      <div className="text-center mb-12">
        <p className="text-slate-500 mb-2">Didn't receive code?</p>
        <button 
          disabled={timer > 0}
          className={`font-bold ${timer > 0 ? 'text-slate-300' : 'text-primary'}`}
        >
          {timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}
        </button>
      </div>

      <button
        onClick={onVerify}
        disabled={otp.some(v => v === '')}
        className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
      >
        Verify
      </button>
    </div>
  );
}
