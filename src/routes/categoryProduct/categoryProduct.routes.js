import { Router } from "express";
import * as categoryProductController from "./../../controllers/CategoryProduct/CategoryProduct.controller.js";
const router = Router();

router.get("/", categoryProductController.getAll);
router.post("/", categoryProductController.createCategory);

export default router;
