import { Router } from "express";
import * as auth from "./../../controllers/auth/auth.controller.js";
import { verifyToken } from "./../../middlewares/auth/auth.middleware.js";
const router = Router();

router.get('/me', verifyToken, auth.profile);
router.post('/register', auth.register);
router.post('/login', auth.login);

export default router;
