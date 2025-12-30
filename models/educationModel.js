import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    imgUrl:{
      type: String,
      default:""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
