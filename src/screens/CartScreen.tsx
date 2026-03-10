import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}

export default function CartScreen({ items, onUpdateQuantity, onCheckout, onBack }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <header className="px-6 pt-12 pb-6 bg-white flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Your Cart</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={onBack}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-4 flex gap-4"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -item.quantity)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg border border-slate-100">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-white shadow-sm rounded-md flex items-center justify-center text-slate-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-white shadow-sm rounded-md flex items-center justify-center text-slate-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="bg-white p-8 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Delivery Fee</span>
              <span className="font-bold text-slate-800">₹{deliveryFee}</span>
            </div>
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex justify-between text-lg font-bold text-slate-900">
              <span>Total Amount</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
