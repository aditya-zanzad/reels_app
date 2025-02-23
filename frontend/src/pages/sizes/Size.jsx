import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const sizes = ["S", "M", "L", "XL", "XXL"];

const Size = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const handleSizeSelect = (size) => {
    navigate(`/api/cloudinary/videos?category=${category.toUpperCase()}&size=${size.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Select a Size for <span className="text-blue-600">{category.toUpperCase()}</span>
      </h1>
      
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Size;
