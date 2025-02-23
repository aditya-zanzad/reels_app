import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Categories from "../pages/category/Categories";
import Size from "../pages/sizes/Size";
import Reels from "../pages/reels/CloudinaryPlayer";
import Dashboard from "../admin/Dashboard";
import Upload from "../admin/pages/Upload";
import CloudinaryPlayer from "../pages/reels/CloudinaryPlayer";
import Cart from "../pages/cart/Cart";

const AppRoutes = () => {
  const userRole = localStorage.getItem("userRole");
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/categories/:category/sizes" element={<Size/>} />
        <Route path="/api/cloudinary/videos" element={<CloudinaryPlayer/>} />
        <Route path="/cart" element={<Cart/>} />

        // for admin 
        <Route path="/admin/dashboard" element={
          userRole === "admin" ? <Dashboard /> : <h1>unauthorized</h1>
        } />
         <Route path="/admin/dashboard/upload" element={<Upload />} />
      </Routes>
  );
};

export default AppRoutes;

