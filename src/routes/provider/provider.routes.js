import { Router } from "express";
import upload from "./../../middlewares/multer/multer.middleware.js";
import * as provider from "./../../controllers/provider/provider.controller.js";

const router = Router();

router.get("/:id", provider.findProviderById);
router.patch("/uploads/:id", upload.single("document"), provider.uploadDocs);

export default router;
