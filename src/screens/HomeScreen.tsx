import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Bell, Search, ShoppingCart, User, Star, Clock, ChevronRight } from 'lucide-react';
import { CATEGORIES, STORES, PRODUCTS } from '../constants';
import { Store, Product } from '../types';

interface Props {
  user: any;
  onSelectCategory: (id: string) => void;
  onSelectStore: (store: Store) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  cartCount: number;
}

export default function HomeScreen({ 
  user, 
  onSelectCategory, 
  onSelectStore, 
  onSelectProduct, 
  onAddToCart,
  onOpenCart, 
  onOpenProfile,
  cartCount 
}: Props) {
  const [activeBanner, setActiveBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStores = STORES.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner(prev => (prev === 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col bg-app-bg overflow-y-auto no-scrollbar pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between bg-white sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <MapPin size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-900">
                {user?.apartment?.block || 'Block B'} • {user?.apartment?.door || '402'}
              </span>
              <ChevronRight size={14} className="text-slate-400" />
            </div>
            <p className="text-xs text-slate-500">{user?.apartment?.name || 'Skyline Heights'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center text-slate-600 relative">
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button onClick={onOpenProfile} className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" />
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search groceries, food or stores"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
          />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-6 mb-8">
        <div className="relative h-44 rounded-3xl overflow-hidden shadow-lg">
          <motion.div 
            animate={{ x: `-${activeBanner * 100}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="flex h-full w-[200%]"
          >
            <div className="w-1/2 h-full bg-gradient-to-r from-primary to-emerald-400 p-8 flex flex-col justify-center text-white relative">
              <h3 className="text-2xl font-bold mb-2">20% OFF<br />Groceries</h3>
              <p className="text-white/80 text-sm mb-4">On your first 3 orders</p>
              <button className="bg-white text-primary px-4 py-2 rounded-xl font-bold text-sm w-fit">Order Now</button>
              <img src="https://picsum.photos/seed/grocery-banner/400/400" alt="Promo" className="absolute right-0 bottom-0 w-32 h-32 object-contain opacity-80" />
            </div>
            <div className="w-1/2 h-full bg-gradient-to-r from-accent to-blue-400 p-8 flex flex-col justify-center text-white relative">
              <h3 className="text-2xl font-bold mb-2">Free Delivery<br />Today</h3>
              <p className="text-white/80 text-sm mb-4">No minimum order value</p>
              <button className="bg-white text-accent px-4 py-2 rounded-xl font-bold text-sm w-fit">Claim Now</button>
              <img src="https://picsum.photos/seed/delivery-banner/400/400" alt="Promo" className="absolute right-0 bottom-0 w-32 h-32 object-contain opacity-80" />
            </div>
          </motion.div>
          <div className="absolute bottom-4 left-8 flex gap-1.5">
            {[0, 1].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="mb-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Quick Categories</h2>
          <button onClick={() => onSelectCategory('all')} className="text-primary font-bold text-sm">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-2 min-w-[80px]"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center text-3xl">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-slate-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nearby Stores */}
      <div className="mb-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Nearby Stores</h2>
        </div>
        <div className="flex flex-col gap-4 px-6">
          {filteredStores.length > 0 ? filteredStores.map(store => (
            <motion.button 
              key={store.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectStore(store)}
              className="premium-card overflow-hidden flex text-left"
            >
              <div className="w-28 h-28">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{store.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-700">{store.rating}</span>
                    <span className="mx-1">•</span>
                    <Clock size={12} />
                    <span>{store.deliveryTime} delivery</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {store.categories.slice(0, 2).map(c => (
                    <span key={c} className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-500 uppercase font-bold tracking-wider">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          )) : (
            <div className="py-8 text-center text-slate-400 font-medium">No stores found</div>
          )}
        </div>
      </div>

      {/* Trending Products */}
      <div className="mb-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Trending Now</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <motion.button 
              key={product.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectProduct(product)}
              className="min-w-[160px] premium-card p-3 text-left"
            >
              <div className="h-32 bg-slate-50 rounded-xl mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h4>
              <p className="text-xs text-slate-500 mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">₹{product.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-md shadow-primary/20 active:scale-90 transition-transform"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>
            </motion.button>
          )) : (
            <div className="py-4 text-slate-400 font-medium">No products found</div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex items-center justify-between z-30">
        <button className="flex flex-col items-center gap-1 text-primary">
          <div className="w-1 h-1 bg-primary rounded-full mb-1"></div>
          <MapPin size={24} />
        </button>
        <button onClick={() => onSelectCategory('all')} className="flex flex-col items-center gap-1 text-slate-400">
          <Search size={24} />
        </button>
        <button onClick={onOpenCart} className="relative flex flex-col items-center gap-1 text-slate-400">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
        <button onClick={onOpenProfile} className="flex flex-col items-center gap-1 text-slate-400">
          <User size={24} />
        </button>
      </div>
    </div>
  );
}
