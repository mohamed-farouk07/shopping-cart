'use client';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaTrash } from 'react-icons/fa'; // Add trash icon for delete button

interface HeaderProps {
  totalQuantity: number;
  favoriteCount: number;
  cartItems: { title: string; price: string; quantity: number }[]; // Cart items prop
  onRemoveItem: (title: string) => void; // Function to remove item from cart
}

const Header: React.FC<HeaderProps> = ({ totalQuantity, favoriteCount, cartItems, onRemoveItem }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); // Track cart menu state
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price

  useEffect(() => {
    // Calculate total price whenever cartItems changes
    const calculatedTotalPrice = cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price.replace('$', '')); // Convert price string to a number
      return acc + itemPrice * item.quantity;
    }, 0);
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]); // Recalculate whenever cart items change

  return (
    <header className="bg-gray-800 shadow-md p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
      <div className="flex items-center">
        {/* Shopping cart with quantity */}
        <div className="relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <FaShoppingCart className="text-white text-2xl" />
            {totalQuantity > 0 && (
              <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {totalQuantity}
              </span>
            )}
          </button>
          {/* Cart dropdown */}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Cart Items</h3>
              {cartItems.length > 0 ? (
                <>
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center mb-2 text-black">
                        <div>
                          <span>{item.title}</span> - <span>{item.price}</span> - Qty: {item.quantity}
                        </div>
                        <button onClick={() => onRemoveItem(item.title)} className="text-red-500 ml-4">
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* Total Price Section */}
                  <div className="border-t mt-4 pt-4">
                    <h4 className="text-lg font-bold text-gray-800">Total:</h4>
                    <p className="text-xl font-semibold text-green-700">${totalPrice.toFixed(2)}</p> {/* Display total price */}
                  </div>
                </>
              ) : (
                <p className='text-gray-400'>Your cart is empty.</p>
              )}
            </div>
          )}
        </div>
        {/* Favorite icon with count */}
        <div className="relative ml-4">
          <FaHeart className="text-white text-2xl" />
          {favoriteCount > 0 && (
            <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {favoriteCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
