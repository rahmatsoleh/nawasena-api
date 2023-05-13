import { Router } from "express";
import * as users from "../../controllers/users/users.controller.js";
import { verifyToken } from "../../middlewares/auth/auth.middleware.js";

const router = Router();

router.get("/", users.getUsers);
router.patch("/provider-detail", verifyToken, users.patchProviderDetail);

export default router;
