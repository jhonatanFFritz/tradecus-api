import { Router } from "express";
import {
  getConveyances,
  getConveyance,
  createConveyance,
  updateConveyance,
  deleteConveyance,
} from "../controllers/conveyance.controller.js";

const router = Router();
router.get("/conveyance", getConveyances);
router.get("/conveyance/:id", getConveyance);
router.post("/conveyance", createConveyance);
router.patch("/conveyance/:id", updateConveyance);
router.delete("/conveyance/:id", deleteConveyance);

export default router;