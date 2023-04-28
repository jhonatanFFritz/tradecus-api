import { Router } from "express";
//importar middlewares para subir imagenes con multer
import { multerUpload } from "../middlewares/multer.js";
import { addNewTour } from "../controllers/tours/addNewTour.controller.js"; // ES6 import syntax (Node.js 14+) cuando se usa el export default y es un modulo creado por nosotros y no uno de node.js o de una libreria de terceros como express o body-parser debemos usar la extension .js

const router = Router();
// router.get("/tours", getTours);

// router.get("/tours/:id", getTour);

router.post("/tour", multerUpload.single("image"), addNewTour, (req, res) => { // "image" is the name of the input field in the form
  console.log(req.file);
  res.send("Tour creado satisfactoriamente");
});

// router.patch("/tours/:id", updateTour);

// router.delete("/tours/:id", deleteTour);

export default router;
