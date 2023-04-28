import { Router } from "express";

//importar middlewares para subir imagenes con multer
import { multerUpload } from "../../middlewares/multer.js";

//importar controlador para subir imagenes a la base de datos y al servidor de archivos
import { addNewImg } from "./img.controller.js";

const router = Router();

router.post(
  "/imagenes",
  multerUpload.single("image"),
  addNewImg,
  (req, res) => {
    // "image" is the name of the input field in the form
    console.log(req.file);
    res.send("Imagen subida satisfactoriamente");
  }
);

export default router;
