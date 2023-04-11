import { Router } from "express";
import {getAllDocTypes} from "../controllers/doctype/getAllDocTypes.controller.js";
import {getOneDocType} from "../controllers/doctype/getOneDocType.controller.js"
import {addNewDocType} from "../controllers/doctype/addNewDocType.controller.js"
import {updateOneDocType} from "../controllers/doctype/updateOneDocType.controller.js"
import {deleteOneDocType} from "../controllers/doctype/deleteOneDocType.controller.js"
// ES6 import syntax (Node.js 14+) cuando se usa el export default y es un modulo creado por nosotros y no uno de node.js o de una libreria de terceros como express o body-parser debemos usar la extension .js

const router = Router();
router.get("/doctypes", getAllDocTypes);

router.get("/doctypes/:id", getOneDocType);

router.post("/doctypes", addNewDocType);

router.patch("/doctypes/:id", updateOneDocType);

router.delete("/doctypes/:id", deleteOneDocType);

export default router;
