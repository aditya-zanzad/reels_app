import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  category: { type: String, required: true, enum: ["MEN", "WOMEN", "KIDS"] },
  size: { type: String, required: true, enum: ["S", "M", "L", "XL", "XXL"] },
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
