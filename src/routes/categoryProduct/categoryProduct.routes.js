const router = Router();
import { Router } from "express";
import * as categoryProductController from "../../controllers/CategoryProduct/CategoryProduct.controller";

router.patch("/category-product", categoryProductController.getAll);

export default router;
