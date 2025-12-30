import Education from "../models/educationModel.js";

export const createEducation = async (req, res) => {
  try {
    const { title, school, year, imgUrl } = req.body;

    if (!title || !school || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEducation = await Education.create({ title, school, year, imgUrl });

    return res.status(201).json({
      success: true,
      message: "Education entry added successfully",
      education: newEducation
    });

  } catch (err) {
    console.error("CREATE EDUCATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      education
    });

  } catch (err) {
    console.error("GET EDUCATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Entry not found" });

    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      education: updated
    });

  } catch (err) {
    console.error("UPDATE EDUCATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Entry not found" });

    return res.status(200).json({
      success: true,
      message: "Education entry deleted successfully"
    });

  } catch (err) {
    console.error("DELETE EDUCATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
