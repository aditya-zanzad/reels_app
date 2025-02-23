import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.length; // Modify this if you have prices
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              to="/categories"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center space-x-4">
                  <video
                    src={item.videoUrl}
                    className="w-20 h-20 object-cover rounded"
                    muted
                    loop
                    playsInline
                  />
                  <div>
                    <h3 className="font-semibold">{item.category}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-8 flex justify-between items-center">
              <div className="text-xl font-bold">
                Total Items: {calculateTotal()}
              </div>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
