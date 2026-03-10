import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShoppingBag, MapPin } from 'lucide-react';

interface Props {
  onTrack: () => void;
  onContinue: () => void;
}

export default function OrderSuccessScreen({ onTrack, onContinue }: Props) {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center px-8 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8"
      >
        <CheckCircle2 size={64} />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-slate-900 mb-4"
      >
        Order Confirmed!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-500 text-lg mb-12"
      >
        Your order has been placed successfully.<br />
        Delivery in <span className="text-primary font-bold">15 minutes</span>.
      </motion.p>

      <div className="w-full space-y-4">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onTrack}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <MapPin size={20} />
          Track Order
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onContinue}
          className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <ShoppingBag size={20} />
          Continue Shopping
        </motion.button>
      </div>
    </div>
  );
}
