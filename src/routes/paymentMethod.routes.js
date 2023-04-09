import { Router } from "express";
import {
  getPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controller.js";

const router = Router();
router.get("/paymentMethods", getPaymentMethods);
router.get("/paymentMethods/:id", getPaymentMethod);
router.post("/paymentMethods", createPaymentMethod);
router.patch("/paymentMethods/:id", updatePaymentMethod);
router.delete("/paymentMethods/:id", deletePaymentMethod);

export default router;
