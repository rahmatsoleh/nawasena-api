import { Router } from "express";
import * as providerServiceController from "../../controllers/providerService/providerService.controller.js";
const router = Router();

router.get("/", providerServiceController.getAllService);
router.post("/", providerServiceController.createService);

export default router;
