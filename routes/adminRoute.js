import { loginAdmin,registerAdmin,adminLogout } from "../controllers/adminController.js";
import express from 'express';

const router = express.Router();

router.post('/register',registerAdmin);
router.post('/login',loginAdmin);
router.post('/logout',adminLogout);

export default router;