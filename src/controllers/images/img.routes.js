import { Router } from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, extname, join } from "path";
import { addNewImg } from "./img.controller.js"

const router = Router();

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const TIPO = ["image/png", "image/jpg", "image/jpeg"];

const multerUpload = multer({ 

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, join(CURRENT_DIR, "../../../public/uploads"));
        },
        filename: (req, file, cb) => {
            const fileExtention = extname(file.originalname);
            const fileName = file.originalname.split(fileExtention)[0];
            cb(null, `${fileName}-${Date.now()}${fileExtention}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if(TIPO.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Formato de archivo no permitido"), false);
        }
    },
    limits: { fileSize: 1000000 * 5},
});

router.post("/imagenes", multerUpload.single("image"),addNewImg, (req, res) => { // "image" is the name of the input field in the form
    console.log(req.file);
    res.send("Imagen subida satisfactoriamente");
  });

export default router;