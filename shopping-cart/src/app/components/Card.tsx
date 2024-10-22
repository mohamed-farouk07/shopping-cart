'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface CardProps {
  image: string;
  title: string;
  price: string;
  quantity: number;
  updateTotalQuantity: (quantityChange: number) => void;
  updateCart: (product: { title: string; price: string; quantity: number }) => void; // Prop to update cart
  updateFavoriteCount: (isFavorite: boolean) => void;
}

const Card: React.FC<CardProps> = ({ image, title, price, quantity, updateTotalQuantity, updateCart, updateFavoriteCount }) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [isFavorite, setIsFavorite] = useState(false);
  const fallbackImage = 'https://via.placeholder.com/300x200?text=Static+Image';

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    updateFavoriteCount(!isFavorite);
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      updateTotalQuantity(1);
      updateCart({ title, price, quantity: quantity + 1 }); // Update the cart with the new quantity
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      updateTotalQuantity(-1);
      updateCart({ title, price, quantity: quantity - 1 }); // Update the cart with the decreased quantity
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <Image
        src={imgSrc}
        alt={title}
        width={300}
        height={200}
        onError={() => setImgSrc(fallbackImage)}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold text-black">{title}</h3>
        <p className="text-gray-500">{price}</p>
        <div className="flex items-center mt-2 text-black">
          <button onClick={decreaseQuantity} className="bg-gray-200 px-3 py-1 rounded-l">−</button>
          <span className="px-4">{quantity}</span>
          <button 
            onClick={increaseQuantity} 
            className={`bg-gray-200 px-3 py-1 rounded-r ${quantity === 10 ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={quantity === 10}
          >
            +
          </button>
        </div>
      </div>
      {/* Heart icon for adding to favorites */}
      <button onClick={toggleFavorite} className="absolute top-4 right-4">
        <FaHeart className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
      </button>
    </div>
  );
};

export default Card;
