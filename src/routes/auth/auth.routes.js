import { Router } from "express";
import { login, profile, register } from "./../../controllers/auth/auth.controller.js";
import { verifyToken } from "./../../middlewares/auth/auth.middleware.js";
const router = Router();

router.get('/me', verifyToken, profile);
router.post('/register', register);
router.post('/login', login);

export default router;
