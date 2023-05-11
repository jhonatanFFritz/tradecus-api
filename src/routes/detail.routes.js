//importamos Router desde express
import { Router } from "express";
//importamos los controladores
import { getAllDetails } from "../controllers/tour_details/getAllDetail.controller.js";
import { addNewDetail } from "../controllers/tour_details/addNewDetail.controller.js";

//creamos el router
const router = Router();

//creamos las rutas
router.post("/details", addNewDetail);

router.get("/details", getAllDetails);

//exportamos el router
export default router;
