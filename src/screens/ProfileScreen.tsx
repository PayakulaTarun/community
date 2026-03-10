import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, Bell, HelpCircle, Settings, LogOut, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onBack, onLogout }: Props) {
  const menuItems = [
    { icon: <ShoppingBag size={20} />, title: 'My Orders', subtitle: 'Order history and tracking' },
    { icon: <MapPin size={20} />, title: 'Addresses', subtitle: 'Saved delivery locations' },
    { icon: <CreditCard size={20} />, title: 'Payments', subtitle: 'Cards, UPI and Wallets' },
    { icon: <Bell size={20} />, title: 'Notifications', subtitle: 'Manage your alerts' },
    { icon: <HelpCircle size={20} />, title: 'Help Center', subtitle: 'FAQs and support' },
    { icon: <Settings size={20} />, title: 'Settings', subtitle: 'App preferences' },
  ];

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <header className="px-6 pt-12 pb-8 bg-white flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Profile</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* User Profile */}
        <div className="bg-white px-6 pb-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-100 rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-lg mb-4">
            <img src="https://picsum.photos/seed/user/200/200" alt="User" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Arun Chandra</h2>
          <p className="text-slate-500">+91 98765 43210</p>
          <button className="mt-4 px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
            Edit Profile
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-4">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full premium-card p-4 flex items-center gap-4 active:scale-98 transition-all"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.subtitle}</p>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </motion.button>
          ))}

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onLogout}
            className="w-full premium-card p-4 flex items-center gap-4 text-red-500 active:scale-98 transition-all"
          >
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <span className="font-bold">Logout</span>
          </motion.button>
        </div>

        <p className="text-center text-slate-300 text-xs py-8">
          Version 1.0.4 (Build 2026)
        </p>
      </div>
    </div>
  );
}
