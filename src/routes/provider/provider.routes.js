import { Router } from "express";
import upload from "./../../middlewares/multer/multer.middleware.js";
import { uploadDocs } from "../../controllers/providerDetail/providerDetail.controller.js";

const router = Router();

router.patch("/uploads/:id", upload.single("document"), uploadDocs);

export default router;
