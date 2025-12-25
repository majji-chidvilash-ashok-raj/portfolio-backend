import express from "express";
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill
} from "../controllers/skillController.js";
import Auth from "../middleswares/Auth.js";

const router = express.Router();

router.get("/", getSkills);

router.post("/", Auth, createSkill);
router.put("/:id", Auth, updateSkill);
router.delete("/:id", Auth, deleteSkill);

export default router;
