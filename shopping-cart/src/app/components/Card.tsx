'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface CardProps {
  image: string;
  title: string;
  price: string;
  quantity: number;
  updateTotalQuantity: (quantityChange: number) => void;
}

const Card: React.FC<CardProps> = ({ image, title, price, quantity, updateTotalQuantity }) => {
  const [imgSrc, setImgSrc] = useState(image);
  const fallbackImage = 'https://via.placeholder.com/300x200?text=Static+Image';

  const increaseQuantity = () => {
    if (quantity < 10) {
      updateTotalQuantity(1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      updateTotalQuantity(-1);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
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
    </div>
  );
};

export default Card;
