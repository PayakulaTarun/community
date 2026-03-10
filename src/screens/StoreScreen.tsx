import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Clock, Info, Search, Heart } from 'lucide-react';
import { Store, Product } from '../types';
import { PRODUCTS } from '../constants';

interface Props {
  store: Store;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}

export default function StoreScreen({ store, onSelectProduct, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('Products');
  const storeProducts = PRODUCTS.filter(p => store.categories.includes(p.category));

  return (
    <div className="h-full w-full bg-app-bg flex flex-col">
      <div className="h-64 relative">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-12 left-6 right-6 flex items-center justify-between">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Search size={20} />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span>{store.rating} (500+ ratings)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{store.deliveryTime} delivery</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-app-bg rounded-t-[40px] -mt-8 relative z-10 p-6">
        <div className="flex gap-8 border-b border-slate-100 mb-6">
          {['Products', 'Reviews', 'Info'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-primary' : 'text-slate-400'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'Products' && (
          <div className="space-y-4">
            {storeProducts.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectProduct(product)}
                className="premium-card p-3 flex gap-4 text-left w-full"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-slate-800">{product.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-lg">₹{product.price}</span>
                    <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold border border-primary/20">
                      ADD
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === 'Info' && (
          <div className="premium-card p-6 space-y-6">
            <div>
              <h5 className="font-bold text-slate-900 mb-2">About Store</h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                {store.name} is your one-stop shop for all fresh groceries and daily essentials. We source directly from local farms to ensure the highest quality.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-2">Store Address</h5>
              <p className="text-sm text-slate-500">
                123, Skyline Heights Commercial Block, Sector 45, Bangalore - 560001
              </p>
            </div>
            <div className="flex items-center gap-3 text-primary font-bold text-sm">
              <Info size={18} />
              View License Information
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
