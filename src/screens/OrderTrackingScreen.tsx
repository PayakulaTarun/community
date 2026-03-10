import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Phone, MessageCircle, MapPin, CheckCircle2, Clock, Truck } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function OrderTrackingScreen({ onBack }: Props) {
  const steps = [
    { id: 1, title: 'Order placed', time: '10:30 AM', status: 'completed' },
    { id: 2, title: 'Preparing', time: '10:35 AM', status: 'active' },
    { id: 3, title: 'Out for delivery', time: 'Expected 10:45 AM', status: 'pending' },
    { id: 4, title: 'Delivered', time: 'Expected 10:50 AM', status: 'pending' },
  ];

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <div className="h-[40%] relative">
        <img 
          src="https://picsum.photos/seed/map-tracking/800/800" 
          alt="Map" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-bg to-transparent" />
        
        <button onClick={onBack} className="absolute top-12 left-6 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-slate-800">
          <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
            <Truck size={24} />
          </div>
          <div className="mt-2 px-4 py-1 bg-white rounded-full shadow-lg text-xs font-bold text-slate-700">
            Delivery Partner is nearby
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-[40px] -mt-8 relative z-10 p-8 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Arriving in 10 min</h1>
            <p className="text-slate-500">Order #ZN-98234</p>
          </div>
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary">
            <Clock size={32} />
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="space-y-8 mb-10">
          {steps.map((step, i) => (
            <div key={step.id} className="flex gap-4 relative">
              {i < steps.length - 1 && (
                <div className={`absolute left-3 top-8 w-0.5 h-8 ${step.status === 'completed' ? 'bg-primary' : 'bg-slate-100'}`} />
              )}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${step.status === 'completed' ? 'bg-primary text-white' : step.status === 'active' ? 'bg-white border-2 border-primary text-primary' : 'bg-white border-2 border-slate-100 text-slate-300'}`}>
                {step.status === 'completed' ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-sm ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{step.title}</h3>
                <p className="text-xs text-slate-400">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Partner */}
        <div className="premium-card p-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden">
            <img src="https://picsum.photos/seed/delivery-partner/200/200" alt="Partner" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">Rahul Sharma</h4>
            <p className="text-xs text-slate-500">Delivery Partner • ⭐ 4.9</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Phone size={20} />
            </button>
            <button className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <MessageCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
