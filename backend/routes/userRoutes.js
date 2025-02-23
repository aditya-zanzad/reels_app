import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Video from "../models/video.js";
import dotenv from "dotenv";
import axios from "axios";

// Load environment variables from .env file
dotenv.config();

const router = express.Router();
router.use(cors());

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your .env file

// ✅ Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId; // Attach user ID to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// ✅ Login User
router.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token to the client
    res.status(200).json({ token, role: user.role});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Register User (With Hashed Password)
router.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update User
router.put("/api/auth/users/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Ensure user can only update their own account
    if (req.user !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Find user and update
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete User
router.delete("/api/auth/users/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user can only delete their own account
    if (req.user !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Protected Route Example (Only Accessible with Valid JWT)
router.get("/api/protected", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user); // Get user from the decoded token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Protected route accessed", user });
  } catch (error) {
    console.error("Error accessing protected route:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/api/cloudinary/videos/:category/:size", async (req, res) => {
  const { category, size } = req.params; // Extract category & size from URL
  const cloudName = "dcewyknnq";
  const apiKey = "829211764199161";
  const apiSecret = "D9jxXyZR5ps7D44ptx99SUFQyTE";
  const baseURL = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video/upload`;

  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
      },
      params: {
        max_results: 50, // Fetch more results
        tags: true, // Ensure tags are included in the response
      },
    });

    // Filter videos based on Category first, then Size
    const filteredVideos = response.data.resources.filter(video => 
      video.tags && video.tags.includes(category) && video.tags.includes(size)
    );

    const videoUrls = filteredVideos.map(video => 
      `https://res.cloudinary.com/${cloudName}/video/upload/${video.public_id}.${video.format}`
    );

    res.json(videoUrls);
  } catch (error) {
    console.error("Error fetching videos from Cloudinary:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch videos from Cloudinary" });
  }
});

router.post("/api/videos/upload", async (req, res) => {
  try {
    const { videoUrl, category, size, price } = req.body;

    if (!videoUrl || !category || !size || !price) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newVideo = new Video({ videoUrl, category, size, price });
    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Server Error!" });
  }
});


export default router;
