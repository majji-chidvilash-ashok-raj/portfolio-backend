import Skill from "../models/skillModel.js";

export const createSkill = async (req, res) => {
  try {
    const { name, icon, description, category } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const newSkill = await Skill.create({
      name,
      icon: icon || "❓",
      description,
      category: category || "General",
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill: newSkill,
    });

  } catch (error) {
    console.error("CREATE SKILL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      skills,
    });

  } catch (error) {
    console.error("GET SKILLS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill: updatedSkill,
    });

  } catch (error) {
    console.error("UPDATE SKILL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });

  } catch (error) {
    console.error("DELETE SKILL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
