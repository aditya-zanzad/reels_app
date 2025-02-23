import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 relative">
      {/* Navbar */}
      <div className="absolute top-6 right-6 flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-2xl mt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome to Fashion Reels 🎥
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover and shop the latest fashion trends through engaging video reels.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">👗 Explore Trends</h3>
          <p className="text-gray-600 mt-2">Watch trending fashion reels & styles.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">📹 Video Shopping</h3>
          <p className="text-gray-600 mt-2">Buy your favorite outfits directly from videos.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">🛍️ Hassle-Free Checkout</h3>
          <p className="text-gray-600 mt-2">A seamless shopping experience at your fingertips.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold">Start Shopping Now</h3>
        <Link
          to="/register"
          className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  );
};

export default Home;
