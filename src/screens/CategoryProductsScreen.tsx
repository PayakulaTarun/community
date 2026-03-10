import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Filter, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';

interface Props {
  category: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export default function CategoryProductsScreen({ category, onSelectProduct, onAddToCart, onBack }: Props) {
  const categoryName = CATEGORIES.find(c => c.id === category)?.name || 'Products';
  const filteredProducts = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  const subCategories = ['All Items', 'Vegetables', 'Rice & grains', 'Snacks', 'Dairy'];

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-slate-800">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900">{categoryName}</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-slate-600">
            <Search size={24} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {subCategories.map((sub, i) => (
            <button 
              key={sub}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-500'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-500 font-medium">{filteredProducts.length} items found</p>
          <button className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectProduct(product)}
              className="premium-card p-3 text-left"
            >
              <div className="h-36 bg-slate-50 rounded-xl mb-3 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
                </div>
              </div>
              <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h4>
              <p className="text-xs text-slate-500 mb-3">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary text-lg">₹{product.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-transform"
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
