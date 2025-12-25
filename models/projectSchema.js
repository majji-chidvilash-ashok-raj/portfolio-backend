import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true 
    },
    github: {
      type: String,
      required: true
    },
    live: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
