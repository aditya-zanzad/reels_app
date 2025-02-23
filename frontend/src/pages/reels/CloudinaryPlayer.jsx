import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./file.css";

const CloudinaryPlayer = () => {
  const [videoUrls, setVideoUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const videoRefs = useRef([]);
  const location = useLocation();

  // Get category and size from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = (queryParams.get("category") || "MEN").toUpperCase();
  const selectedSize = (queryParams.get("size") || "M").toUpperCase();

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://reels-app-backend.onrender.com/api/cloudinary/videos/${selectedCategory}/${selectedSize}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let fetchedUrls = await response.json();
        console.log("Raw fetched URLs:", fetchedUrls);

        // Ensure the URLs are correctly formatted for Cloudinary
        const validUrls = fetchedUrls.map((url) => {
          const match = url.match(/upload\/https:\/reels-app-backend\.onrender\.com\/(.+)\.mp4/);
          return match
            ? `https://res.cloudinary.com/dcewyknnq/video/upload/${match[1]}.mp4`
            : url;
        });

        setVideoUrls(validUrls);
        console.log("Corrected Video URLs:", validUrls);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [selectedCategory, selectedSize]);

  // Auto-play videos when visible and enable audio
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch((err) => console.error("Autoplay failed:", err));
            video.muted = false;
          } else {
            video.pause();
            video.muted = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videoUrls]);

  // Handle Next Reel
  const handleNextReel = () => {
    if (videoUrls.length === 0) {
      alert(`No videos available for ${selectedCategory} - Size ${selectedSize}`);
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    const selectedVideo = {
      id: videoUrls[currentIndex], // Using URL as ID (ensure uniqueness)
      videoUrl: videoUrls[currentIndex],
      category: selectedCategory,
      size: selectedSize
    };
  
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Add new item
    const updatedCart = [...existingCart, selectedVideo];
  
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    alert("Added to cart 🛒");
    console.log("Updated Cart:", updatedCart);
  };
  

  return (
    <div className="reel-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Showing Videos for Category: {selectedCategory} | Size: {selectedSize}
      </h2>

      {videoUrls.length > 0 ? (
        <div className="video-wrapper">
          <video
            key={videoUrls[currentIndex]}
            ref={(el) => {
              if (el) videoRefs.current[currentIndex] = el;
            }}
            controls
            loop
            playsInline
            autoPlay
            className="reel-video rounded-lg shadow-md w-full max-w-md"
          >
            <source src={videoUrls[currentIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="video-overlay mt-4 flex flex-col gap-3">
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={handleNextReel}
            >
              Next Reel ⏭️
            </button>
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              onClick={handleAddToCart}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">
          No videos available for {selectedCategory} - Size {selectedSize}.
        </p>
      )}
    </div>
  );
};

export default CloudinaryPlayer;
