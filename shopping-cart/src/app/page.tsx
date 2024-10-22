'use client';
import Header from './components/Header';
import Card from './components/Card';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [quantities, setQuantities] = useState<number[]>(Array(20).fill(0));
  const [cartItems, setCartItems] = useState<{ title: string; price: string; quantity: number }[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  const products = Array.from({ length: 20 }, (_, i) => ({
    image: `https://via.placeholder.com/300x200?text=Product+${i + 1}`,
    title: `Product ${i + 1}`,
    price: `$${(i + 1) * 10}.00`,
  }));

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedQuantities = localStorage.getItem('quantities');
    const savedTotalQuantity = localStorage.getItem('totalQuantity');
    const savedFavoriteCount = localStorage.getItem('favoriteCount');
    const savedFavoriteItems = localStorage.getItem('favoriteItems');

    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    if (savedQuantities) {
      setQuantities(JSON.parse(savedQuantities));
    }
    if (savedTotalQuantity) {
      setTotalQuantity(JSON.parse(savedTotalQuantity));
    }
    if (savedFavoriteCount) {
      setFavoriteCount(JSON.parse(savedFavoriteCount));
    }
    if (savedFavoriteItems) {
      setFavoriteItems(JSON.parse(savedFavoriteItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('quantities', JSON.stringify(quantities));
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
    localStorage.setItem('favoriteCount', JSON.stringify(favoriteCount));
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [cartItems, quantities, totalQuantity, favoriteCount, favoriteItems]);

  const updateTotalQuantity = (index: number, quantityChange: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.min(Math.max(newQuantities[index] + quantityChange, 0), 10);
      const newTotalQuantity = newQuantities.reduce((acc, qty) => acc + qty, 0);
      setTotalQuantity(newTotalQuantity);
      return newQuantities;
    });
  };

  const updateFavoriteCount = (isFavorite: boolean) => {
    setFavoriteCount((prev) => (isFavorite ? prev + 1 : prev - 1));
  };

  const updateCart = (product: { title: string; price: string; quantity: number }) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.title === product.title);
      if (existingProduct) {
        if (product.quantity === 0) {
          return prev.filter((item) => item.title !== product.title);
        } else {
          return prev.map((item) =>
            item.title === product.title ? { ...item, quantity: product.quantity } : item
          );
        }
      } else {
        return [...prev, product];
      }
    });
  };

  const removeItemFromCart = (title: string) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };

  return (
    <div className="bg-white min-h-screen">
      <Header
        totalQuantity={totalQuantity}
        favoriteCount={favoriteCount}
        cartItems={cartItems}
        onRemoveItem={removeItemFromCart}
      />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card 
              key={index} 
              image={product.image} 
              title={product.title} 
              price={product.price} 
              quantity={quantities[index]} 
              updateTotalQuantity={(change) => updateTotalQuantity(index, change)} 
              updateFavoriteCount={updateFavoriteCount} 
              updateCart={updateCart}
              favoriteItems={favoriteItems}
              setFavoriteItems={setFavoriteItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
