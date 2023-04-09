import { Router } from "express";
import {
  getAdditionalServices,
  getAdditionalService,
  createAdditionalService,
  updateAdditionalService,
  deleteAdditionalService,
} from "../controllers/additionalService.controller.js";

//Para crear un router debemos usar la funcion Router() de express y guardarlo en una constante
const router = Router();

//Para crear una ruta debemos usar el metodo router.metodoHTTP() y pasarle como primer parametro la ruta y como segundo parametro la funcion que se ejecutara cuando se haga una peticion a esa ruta
router.get("/additionalServices", getAdditionalServices);
router.get("/additionalServices/:id", getAdditionalService);
router.post("/additionalServices", createAdditionalService);
router.patch("/additionalServices/:id", updateAdditionalService);
router.delete("/additionalServices/:id", deleteAdditionalService);

//Para exportar el router debemos usar la palabra reservada export y la palabra reservada default
export default router;