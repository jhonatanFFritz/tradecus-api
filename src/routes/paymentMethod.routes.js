import { Router } from "express";
import {getAllPaymentMethods} from "../controllers/payment_method/getAllPaymentMethods.controller.js";
import { getOnePaymentMethod } from "../controllers/payment_method/getOnePaymentMethod.controllers.js";
import { addNewPaymentMethod } from "../controllers/payment_method/addNewPaymentMethod.controller.js";
import { updateOnePaymentMethod } from "../controllers/payment_method/updateOnePaymentMethod.controller.js";
import { deleteOnePaymentMethod } from "../controllers/payment_method/deleteOnePaymentMethod.controller.js";

const router = Router();
router.get("/paymentMethods", getAllPaymentMethods);
router.get("/paymentMethods/:id", getOnePaymentMethod);
router.post("/paymentMethods", addNewPaymentMethod);
router.patch("/paymentMethods/:id", updateOnePaymentMethod);
router.delete("/paymentMethods/:id", deleteOnePaymentMethod);

export default router;
