import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onClick: () => void;
}

export default function MiniCart({ items, onClick }: Props) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-6 right-6 z-40"
        >
          <button
            onClick={onClick}
            className="w-full bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Added
                </p>
                <p className="text-lg font-bold">₹{totalPrice}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-bold">
              <span>View Cart</span>
              <ChevronRight size={20} />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
