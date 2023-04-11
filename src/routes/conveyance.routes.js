import { Router } from "express";
import { createConveyance } from "../controllers/conveyance/addNewConveyance.controller.js";
import { getAllConveyances } from "../controllers/conveyance/getAllConveyances.controller.js";
import { getConveyance } from "../controllers/conveyance/getOneConveyance.controller.js";
import { updateOneConveyance } from "../controllers/conveyance/updateOneConveyance.controller.js";
import { deleteOneConveyance } from "../controllers/conveyance/deleteOneConveyance.controller.js";

const router = Router();
router.get("/conveyance", getAllConveyances);
router.get("/conveyance/:id", getConveyance);
router.post("/conveyance", createConveyance);
router.patch("/conveyance/:id", updateOneConveyance);
router.delete("/conveyance/:id", deleteOneConveyance);

export default router;
