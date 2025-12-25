import express from "express";
import {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation
} from "../controllers/educationController.js";
import Auth from "../middleswares/Auth.js";

const router = express.Router();


router.get("/", getEducation);


router.post("/", Auth, createEducation);
router.put("/:id", Auth, updateEducation);
router.delete("/:id", Auth, deleteEducation);

export default router;
