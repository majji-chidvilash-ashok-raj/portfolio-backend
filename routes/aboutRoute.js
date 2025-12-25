import express from "express";
import { getAboutInfo, updateAboutInfo } from "../controllers/aboutController.js";
import Auth from "../middleswares/Auth.js";

const router = express.Router();

router.get("/", getAboutInfo);
router.put("/", Auth, updateAboutInfo);

export default router;
