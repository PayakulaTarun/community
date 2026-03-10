import { Product, Store } from './types';

export const CATEGORIES = [
  { id: 'groceries', name: 'Groceries', icon: '🛒' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'dairy', name: 'Dairy', icon: '🥛' },
  { id: 'snacks', name: 'Snacks', icon: '🍪' },
  { id: 'food', name: 'Food', icon: '🍔' },
  { id: 'medicine', name: 'Medicine', icon: '💊' },
  { id: 'stationery', name: 'Stationery', icon: '✏️' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Organic Milk',
    price: 45,
    image: 'https://picsum.photos/seed/milk/400/400',
    category: 'dairy',
    description: 'Fresh farm milk delivered daily to your doorstep.',
    rating: 4.8
  },
  {
    id: 'p2',
    name: 'Red Apples (1kg)',
    price: 120,
    image: 'https://picsum.photos/seed/apple/400/400',
    category: 'fruits',
    description: 'Crispy and sweet red apples from the valley.',
    rating: 4.5
  },
  {
    id: 'p3',
    name: 'Whole Wheat Bread',
    price: 35,
    image: 'https://picsum.photos/seed/bread/400/400',
    category: 'groceries',
    description: 'Freshly baked whole wheat bread for a healthy start.',
    rating: 4.7
  },
  {
    id: 'p4',
    name: 'Organic Tomatoes',
    price: 40,
    image: 'https://picsum.photos/seed/tomato/400/400',
    category: 'vegetables',
    description: 'Juicy organic tomatoes perfect for salads and cooking.',
    rating: 4.6
  },
  {
    id: 'p5',
    name: 'Potato Chips',
    price: 20,
    image: 'https://picsum.photos/seed/chips/400/400',
    category: 'snacks',
    description: 'Crunchy salted potato chips for your snack time.',
    rating: 4.4
  }
];

export const STORES: Store[] = [
  {
    id: 's1',
    name: 'Fresh Mart',
    image: 'https://picsum.photos/seed/store1/600/400',
    rating: 4.6,
    deliveryTime: '10 min',
    categories: ['groceries', 'vegetables', 'fruits', 'dairy']
  },
  {
    id: 's2',
    name: 'Daily Needs',
    image: 'https://picsum.photos/seed/store2/600/400',
    rating: 4.4,
    deliveryTime: '15 min',
    categories: ['groceries', 'snacks', 'stationery']
  },
  {
    id: 's3',
    name: 'Green Grocer',
    image: 'https://picsum.photos/seed/store3/600/400',
    rating: 4.8,
    deliveryTime: '12 min',
    categories: ['vegetables', 'fruits']
  }
];
