import { Router } from "express";
import {addNewRol} from "../controllers/roles/addNewRol.controller.js";
import {getAllRoles} from "../controllers/roles/getAllRoles.controller.js";
import {getOneRol} from "../controllers/roles/getOneRol.controller.js";
import {updateRol} from "../controllers/roles/updateRol.controller.js";
import {deleteOneRol} from "../controllers/roles/deleteOneRol.controller.js";

const router = Router();

router.post("/rol", addNewRol);
router.get("/rol", getAllRoles);
router.get("/rol/:id", getOneRol);
router.patch("/rol/:id", updateRol);
router.delete("/rol/:id", deleteOneRol);


export default router;