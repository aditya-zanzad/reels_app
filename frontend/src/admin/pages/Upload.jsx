import React, { useState, useEffect, useRef } from "react";

const CloudinaryUpload = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S"); // Default size
  const [selectedCategory, setSelectedCategory] = useState("MEN"); // Default category
  const [price, setPrice] = useState(""); // New price field
  const [widgetReady, setWidgetReady] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const scriptId = "cloudinary-script";

    const initializeWidget = () => {
      if (!widgetRef.current) {
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: "dcewyknnq",
            uploadPreset: "sangtani",
            resourceType: "video",
            multiple: false,
            tags: [selectedSize, selectedCategory],
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setVideoUrl(result.info.secure_url);
            }
          }
        );
        setWidgetReady(true);
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = initializeWidget;
      document.body.appendChild(script);
    } else {
      initializeWidget();
    }
  }, [selectedSize, selectedCategory]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.update({ tags: [selectedSize, selectedCategory] });
      widgetRef.current.open();
    }
  };

  // ✅ Send video details to backend
  const handleSubmit = async () => {
    if (!videoUrl || !price) {
      alert("Please upload a video and enter a price.");
      return;
    }

    const videoData = {
      videoUrl,
      category: selectedCategory,
      size: selectedSize,
      price: parseFloat(price), // Convert to number
    };

    try {
      const response = await fetch("https://reels-app-backend.onrender.com/api/videos/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        alert("Video uploaded successfully 🎉");
        setVideoUrl(null);
        setPrice("");
      } else {
        throw new Error("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Video</h1>

      {/* Clothing Size Selection */}
      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 font-medium mb-2">Select Clothing Size</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="S">Small (S)</option>
          <option value="M">Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="XL">Extra Large (XL)</option>
          <option value="XXL">Double XL (XXL)</option>
        </select>
      </div>

      {/* Category Selection */}
      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 font-medium mb-2">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MEN">MEN</option>
          <option value="WOMEN">WOMEN</option>
          <option value="KIDS">KIDS</option>
        </select>
      </div>

      {/* Price Input Field */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-gray-700 font-medium mb-2">Enter Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter price"
          min="0"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={openWidget}
        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition 
        ${widgetReady ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 cursor-not-allowed"}`}
        disabled={!widgetReady}
      >
        {widgetReady ? "Upload Video" : "Loading Uploader..."}
      </button>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Submit Video ✅
      </button>

      {/* Display Uploaded Video */}
      {videoUrl && (
        <div className="mt-6 w-full max-w-md bg-white p-4 shadow-lg rounded-lg">
          <video className="w-full rounded-lg" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="mt-2 text-gray-700">Category: <strong>{selectedCategory}</strong></p>
          <p className="text-gray-700">Size: <strong>{selectedSize}</strong></p>
          <p className="text-gray-700">Price: <strong>₹{price}</strong></p>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
