import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote, Tag, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onPlaceOrder: () => void;
  onBack: () => void;
}

export default function CheckoutScreen({ items, onPlaceOrder, onBack }: Props) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <header className="px-6 pt-12 pb-6 bg-white flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Checkout</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {/* Delivery Address */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Delivery Address</h2>
          <div className="premium-card p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">Home</h3>
              <p className="text-sm text-slate-500 mt-1">Block B • 402, Skyline Heights, Bangalore - 560001</p>
            </div>
            <button className="text-primary font-bold text-sm">Change</button>
          </div>
        </section>

        {/* Payment Methods */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Payment Method</h2>
          <div className="space-y-3">
            {[
              { id: 'upi', name: 'UPI (Google Pay / PhonePe)', icon: <Wallet size={20} /> },
              { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard size={20} /> },
              { id: 'cash', name: 'Cash on Delivery', icon: <Banknote size={20} /> },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${paymentMethod === method.id ? 'bg-primary/5 border-primary' : 'bg-white border-slate-100'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {method.icon}
                </div>
                <span className={`flex-1 text-left font-bold ${paymentMethod === method.id ? 'text-primary' : 'text-slate-700'}`}>
                  {method.name}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-slate-200'}`}>
                  {paymentMethod === method.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Coupon */}
        <section>
          <div className="premium-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                <Tag size={20} />
              </div>
              <span className="font-bold text-slate-700">Apply Coupon</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        </section>

        {/* Order Summary */}
        <section className="premium-card p-6 space-y-3">
          <h2 className="font-bold text-slate-900 mb-4">Order Summary</h2>
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
        </section>
      </div>

      <div className="bg-white p-8 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={onPlaceOrder}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          Place Order • ₹{total}
        </button>
      </div>
    </div>
  );
}
