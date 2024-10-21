'use client';
import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

interface HeaderProps {
  totalQuantity: number;
}

const Header: React.FC<HeaderProps> = ({ totalQuantity }) => {
  return (
    <header className="bg-gray-800 shadow-md p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
      <div className="flex items-center">
        <div className="relative">
          <FaShoppingCart className="text-white text-2xl" />
          {totalQuantity > 0 && (
            <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {totalQuantity}
            </span>
          )}
        </div>
        <FaHeart className="text-white text-2xl ml-4" />
      </div>
    </header>
  );
};

export default Header;
