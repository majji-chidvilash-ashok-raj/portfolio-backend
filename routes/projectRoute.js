import express from "express";
import { 
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import Auth from "../middleswares/Auth.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", Auth, createProject);
router.put("/:id", Auth, updateProject);
router.delete("/:id", Auth, deleteProject);

export default router;
