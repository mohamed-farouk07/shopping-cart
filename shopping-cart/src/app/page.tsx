"use client";
import Header from "./components/Header";
import Card from "./components/Card";
import React, { useState } from "react";

export default function Home() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [quantities, setQuantities] = useState<number[]>(Array(20).fill(0));
  const [cartItems, setCartItems] = useState<
    { title: string; price: string; quantity: number }[]
  >([]); // Track cart items

  const products = Array.from({ length: 20 }, (_, i) => ({
    image: `https://via.placeholder.com/300x200?text=Product+${i + 1}`,
    title: `Product ${i + 1}`,
    price: `$${(i + 1) * 10}.00`,
  }));

  const updateTotalQuantity = (index: number, quantityChange: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.min(
        Math.max(newQuantities[index] + quantityChange, 0),
        10
      );
      const newTotalQuantity = newQuantities.reduce((acc, qty) => acc + qty, 0);
      setTotalQuantity(newTotalQuantity);
      return newQuantities;
    });
  };

  const updateFavoriteCount = (isFavorite: boolean) => {
    setFavoriteCount((prev) => (isFavorite ? prev + 1 : prev - 1));
  };

  // Function to update cart items
  const updateCart = (product: {
    title: string;
    price: string;
    quantity: number;
  }) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.title === product.title);
      if (existingProduct) {
        if (product.quantity === 0) {
          return prev.filter((item) => item.title !== product.title); // Remove product if quantity is 0
        } else {
          return prev.map((item) =>
            item.title === product.title
              ? { ...item, quantity: product.quantity }
              : item
          );
        }
      } else {
        return [...prev, product];
      }
    });
  };

  // Function to remove item from cart
  const removeItemFromCart = (title: string) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };

  return (
    <div className="bg-white min-h-screen">
      <Header
        totalQuantity={totalQuantity}
        favoriteCount={favoriteCount}
        cartItems={cartItems}
        onRemoveItem={removeItemFromCart} // Pass remove function to Header
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
              updateTotalQuantity={(change) =>
                updateTotalQuantity(index, change)
              }
              updateFavoriteCount={updateFavoriteCount}
              updateCart={updateCart} // Pass the cart update function
            />
          ))}
        </div>
      </div>
    </div>
  );
}
