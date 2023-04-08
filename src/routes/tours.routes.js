import { Router } from "express";
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tours.controller.js";// ES6 import syntax (Node.js 14+) cuando se usa el export default y es un modulo creado por nosotros y no uno de node.js o de una libreria de terceros como express o body-parser debemos usar la extension .js

const router = Router();
router.get("/tours", getTours);

router.get("/tours/:id", getTour);

router.post("/tours", createTour);

router.patch("/tours/:id", updateTour);

router.delete("/tours/:id", deleteTour);

export default router;
