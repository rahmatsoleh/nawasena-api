import { Router } from "express";
import * as providerServiceController from "../../controllers/providerService/providerService.controller.js";
const router = Router();

router.post("/", providerServiceController.createService);

export default router;
