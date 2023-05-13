import { Router } from "express";
import * as HistoryService from "../../controllers/historyService/historyService.controller.js";
const router = Router();

router.get("/", HistoryService.getAllHistoryService);
router.post("/", HistoryService.createHistoryService);

export default router;
