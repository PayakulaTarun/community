/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { View, AppState, CartItem, Product, Store } from './types';
import { STORES, PRODUCTS, CATEGORIES } from './constants';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import ApartmentSetupScreen from './screens/ApartmentSetupScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import StoreScreen from './screens/StoreScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [state, setState] = useState<AppState>({
    view: 'splash',
    user: null,
    cart: [],
  });

  const setView = (view: View) => setState(prev => ({ ...prev, view }));
  
  const addToCart = (product: Product) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...prev, cart: [...prev.cart, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== productId)
    }));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    }));
  };

  const selectCategory = (categoryId: string) => {
    setState(prev => ({ ...prev, view: 'category-products', selectedCategory: categoryId }));
  };

  const selectStore = (store: Store) => {
    setState(prev => ({ ...prev, view: 'store', selectedStore: store }));
  };

  const selectProduct = (product: Product) => {
    setState(prev => ({ ...prev, view: 'product', selectedProduct: product }));
  };

  const handleLogin = (phone: string) => {
    setState(prev => ({ ...prev, user: { ...prev.user, phone }, view: 'otp' }));
  };

  const handleOTPVerify = () => {
    setState(prev => ({ ...prev, view: 'apartment-setup' }));
  };

  const handleApartmentSetup = (apartment: any) => {
    setState(prev => ({ ...prev, user: { ...prev.user, apartment }, view: 'home' }));
  };

  const renderView = () => {
    switch (state.view) {
      case 'splash':
        return <SplashScreen onComplete={() => setView('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setView('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'otp':
        return <OTPScreen onVerify={handleOTPVerify} onBack={() => setView('login')} />;
      case 'apartment-setup':
        return <ApartmentSetupScreen onComplete={handleApartmentSetup} />;
      case 'home':
        return (
          <HomeScreen 
            user={state.user}
            onSelectCategory={selectCategory}
            onSelectStore={selectStore}
            onSelectProduct={selectProduct}
            onOpenCart={() => setView('cart')}
            onOpenProfile={() => setView('profile')}
            cartCount={state.cart.length}
          />
        );
      case 'categories':
        return <CategoriesScreen onSelectCategory={selectCategory} onBack={() => setView('home')} />;
      case 'category-products':
        return (
          <CategoryProductsScreen 
            category={state.selectedCategory!} 
            onSelectProduct={selectProduct}
            onBack={() => setView('home')}
          />
        );
      case 'store':
        return (
          <StoreScreen 
            store={state.selectedStore!} 
            onSelectProduct={selectProduct}
            onBack={() => setView('home')}
          />
        );
      case 'product':
        return (
          <ProductScreen 
            product={state.selectedProduct!} 
            onAddToCart={addToCart}
            onBack={() => setView('home')}
          />
        );
      case 'cart':
        return (
          <CartScreen 
            items={state.cart} 
            onUpdateQuantity={updateQuantity}
            onCheckout={() => setView('checkout')}
            onBack={() => setView('home')}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen 
            items={state.cart}
            onPlaceOrder={() => {
              setState(prev => ({ ...prev, cart: [], view: 'order-success' }));
            }}
            onBack={() => setView('cart')}
          />
        );
      case 'order-success':
        return (
          <OrderSuccessScreen 
            onTrack={() => setView('order-tracking')}
            onContinue={() => setView('home')}
          />
        );
      case 'order-tracking':
        return <OrderTrackingScreen onBack={() => setView('home')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setView('home')} onLogout={() => setView('login')} />;
      default:
        return <SplashScreen onComplete={() => setView('onboarding')} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-app-bg overflow-hidden relative shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
