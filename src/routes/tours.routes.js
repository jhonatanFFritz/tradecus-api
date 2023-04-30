// import { Router } from "express";
// //importar middlewares para subir imagenes con multer
// import { multerUpload } from "../middlewares/multer.js";
// import { addNewTour } from "../controllers/tours/addNewTour.controller.js";
// import { getAllTours } from "../controllers/tours/getAllTours.controller.js";
// import { getOneTour } from "../controllers/tours/getOneTour.controller.js";
// import { updateTour } from "../controllers/tours/updateTour.controller.js";
// import {deleteTour} from "../controllers/tours/deleteTour.controller.js";
// // ES6 import syntax (Node.js 14+) cuando se usa el export default y es un modulo creado por nosotros y no uno de node.js o de una libreria de terceros como express o body-parser debemos usar la extension .js

// const router = Router();
// router.get("/tour", getAllTours);

// router.get("/tour/:id", getOneTour);

// router.post("/tour", multerUpload.single("image"), addNewTour, (req, res) => {
//   // "image" is the name of the input field in the form
//   console.log(req.file);
//   res.send("Tour creado satisfactoriamente");
// });

// router.patch("/tour/:id", updateTour);

// router.delete("/tour/:id", deleteTour);

// export default router;
import { Router } from "express";
import { multerUpload } from "../middlewares/multer.js";
import { addNewTour } from "../controllers/tours/addNewTour.controller.js";
import { getAllTours } from "../controllers/tours/getAllTours.controller.js";
import { getOneTour } from "../controllers/tours/getOneTour.controller.js";
import { updateTour } from "../controllers/tours/updateTour.controller.js";
import { updateTourImg } from "../controllers/tours/updateTourImg.controller.js";
import { deleteTour } from "../controllers/tours/deleteTour.controller.js";
import { removeTourImg } from "../controllers/tours/removeTourImg.controller.js";

const router = Router();
router.get("/tour", getAllTours);

router.get("/tour/:id", getOneTour);

router.post("/tour", multerUpload.array("images"), addNewTour, (req, res) => {
  console.log(req.files);
  res.send("Tour creado satisfactoriamente");
});

router.patch("/tour/:id", updateTour);
// Endpoint para actualizar una imagen de un tour
router.patch(
  "/tour/:id_tour/imagen/:id_img",
  multerUpload.single("image"),
  updateTourImg
);

router.delete("/tour/:id", deleteTour);
router.delete("/tour/:id/imagen/:imgId", removeTourImg);

export default router;
