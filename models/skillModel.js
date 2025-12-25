import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      default: "❓" 
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String, 
      default: "General"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
