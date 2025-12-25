
import Project from "../models/projectSchema.js";

export const createProject = async (req, res) => {
  try {
    let { title, shortDescription, icon, github, live } = req.body;

    if (!title || !shortDescription || !icon || !github) {
      return res.status(400).json({
        success: false,
        message: "Title, description, icon and GitHub link are required",
      });
    }

    if (!live || live.trim() === "") {
      live = "/"; 
    }

    const newProject = await Project.create({
      title,
      shortDescription,
      icon,
      github,
      live,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProject = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "shortDescription",
      "icon",
      "github",
      "live",
    ];

    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
