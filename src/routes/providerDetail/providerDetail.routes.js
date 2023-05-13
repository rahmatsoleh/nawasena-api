import { Router } from "express";
import upload from "./../../middlewares/multer/multer.middleware.js";
import * as providerDetail from "./../../controllers/providerDetail/providerDetail.controller.js";

const router = Router();

router.patch(
  "/uploads/:id",
  upload.single("document"),
  providerDetail.uploadDocs
);

export default router;
