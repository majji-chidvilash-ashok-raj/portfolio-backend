import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      required: true,
      default: "Hi, I'm Chidvilash"
    },
    heroSubtitle: {
      type: String,
      required: true,
      default: "A Frontend Developer"
    },
    heroTagline: {
      type: String,
      required: true,
      default: "I create interactive and modern web experiences."
    },
    resumeUrl: {
      type: String,
      required: true,
      default: "/"
    }
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
