import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: Props) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-12 left-6 right-6 z-[100] flex justify-center"
        >
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <CheckCircle2 size={20} className="text-primary" />
            <span className="font-bold text-sm">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
