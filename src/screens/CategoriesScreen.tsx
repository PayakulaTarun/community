import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface Props {
  onSelectCategory: (id: string) => void;
  onBack: () => void;
}

export default function CategoriesScreen({ onSelectCategory, onBack }: Props) {
  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <header className="px-6 pt-12 pb-6 bg-white flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-800">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">All Categories</h1>
      </header>

      <div className="px-6 py-4">
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search categories"
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-3xl border border-slate-50 shadow-sm active:scale-95 transition-all"
            >
              <div className="text-4xl">{cat.icon}</div>
              <span className="text-xs font-bold text-slate-600 text-center">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
