import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const STEPS = [
  {
    title: "Shop From Stores Near Your Apartment",
    subtitle: "Groceries, essentials and food from stores within 2km.",
    image: "https://picsum.photos/seed/apartment/800/800",
    color: "#16C47F"
  },
  {
    title: "Delivered To Your Door",
    subtitle: "No more walking to the gate. Your order arrives at your door.",
    image: "https://picsum.photos/seed/delivery/800/800",
    color: "#2563EB"
  },
  {
    title: "Fast & Convenient",
    subtitle: "Order anytime and get delivery within minutes.",
    image: "https://picsum.photos/seed/basket/800/800",
    color: "#16C47F"
  }
];

export default function OnboardingScreen({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <img 
              src={STEPS[currentStep].image} 
              alt="Onboarding" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
          </motion.div>
        </AnimatePresence>
        
        <button 
          onClick={onComplete}
          className="absolute top-12 right-6 text-slate-500 font-medium text-sm"
        >
          Skip
        </button>
      </div>

      <div className="px-8 pb-12 pt-8 bg-white rounded-t-[40px] -mt-10 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4">
              {STEPS[currentStep].title}
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              {STEPS[currentStep].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={next}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          {currentStep === STEPS.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
