"use client";
import Header from "./components/Header";
import Card from "./components/Card";
import React, { useState } from "react";

export default function Home() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantities, setQuantities] = useState<number[]>(Array(20).fill(0));

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

  return (
    <div className="bg-white min-h-screen">
      <Header totalQuantity={totalQuantity} />
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
