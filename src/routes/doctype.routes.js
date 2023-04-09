import { Router } from "express";
import {
  getDocTypes,
  getDocType,
  createDocType,
  updateDocType,
  deleteDocType,
} from "../controllers/doctype.controller.js";
// ES6 import syntax (Node.js 14+) cuando se usa el export default y es un modulo creado por nosotros y no uno de node.js o de una libreria de terceros como express o body-parser debemos usar la extension .js

const router = Router();
router.get("/doctype", getDocTypes);

router.get("/doctype/:id", getDocType);

router.post("/doctype", createDocType);

router.patch("/doctype/:id", updateDocType);

router.delete("/doctype/:id", deleteDocType);

export default router;
