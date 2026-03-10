export type View = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'otp' 
  | 'apartment-setup' 
  | 'home' 
  | 'categories' 
  | 'category-products' 
  | 'store' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'order-tracking' 
  | 'profile';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  categories: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  view: View;
  user: {
    phone?: string;
    apartment?: {
      name: string;
      block: string;
      floor: string;
      door: string;
    };
  } | null;
  cart: CartItem[];
  selectedCategory?: string;
  selectedStore?: Store;
  selectedProduct?: Product;
}
