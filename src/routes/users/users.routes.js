import { Router } from "express";
import * as users from "../../controllers/users/users.controller.js";

const router = Router()

router.get('/', users.getUsers)

export default router;