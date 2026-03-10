import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export default function ProductScreen({ product, onAddToCart, onBack }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="h-[50%] bg-slate-50 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-12" />
        
        <div className="absolute top-12 left-6 right-6 flex items-center justify-between">
          <button onClick={onBack} className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-slate-800">
            <ArrowLeft size={24} />
          </button>
          <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-slate-400">
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-8 pt-8 bg-white rounded-t-[40px] -mt-10 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-slate-700">{product.rating}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
        <p className="text-slate-500 leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-slate-400 text-sm mb-1">Total Price</p>
            <p className="text-3xl font-bold text-primary">₹{product.price * quantity}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-slate-600 active:scale-90 transition-transform"
            >
              <Minus size={20} />
            </button>
            <span className="text-xl font-bold text-slate-800 w-6 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-slate-600 active:scale-90 transition-transform"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isAdded ? 'bg-emerald-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
          >
            {isAdded ? (
              <>Added to Cart!</>
            ) : (
              <>
                <ShoppingBag size={20} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
