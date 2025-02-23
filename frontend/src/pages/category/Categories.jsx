import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import men from "../../assets/man.png";
import women from "../../assets/women.png";
import kids from "../../assets/kids.png";

const categories = [
  { name: "Men", image: men },
  { name: "Women", image: women },
  { name: "Kids", image: kids },
];

const Categories = () => {
  const isAdmin = localStorage.getItem("userRole") === "admin";
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItemCount(cart.length);
  }, []);

  // Update cart count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemCount(cart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="w-full flex justify-between max-w-5xl">
        {/* Cart Button */}
        <Link
          to="/cart"
          className="mb-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Cart ({cartItemCount})
        </Link>

        {/* Admin Panel */}
        {isAdmin ? (
          <Link
            to="/admin/dashboard"
            className="mb-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Admin Panel
          </Link>
        ) : (
          <button
            disabled
            className="mb-6 px-6 py-2 bg-gray-400 text-white font-bold rounded-lg shadow-md cursor-not-allowed"
          >
            Admin Panel
          </button>
        )}
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Browse Categories
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-5xl w-full">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories/${category.name.toLowerCase()}/sizes`}
            className="relative overflow-hidden rounded-xl shadow-xl transition-transform transform hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover rounded-xl brightness-90 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center opacity-0 hover:opacity-100 transition-opacity">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <p className="mt-2 text-sm text-gray-300">
                Explore the latest styles
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;