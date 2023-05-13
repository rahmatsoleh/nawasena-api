import { Router } from "express";
import * as users from "../../controllers/users/users.controller.js";

const router = Router();

router.get("/", users.getUsers);
router.patch("/provider-detail", users.patchProviderDetail);

export default router;
