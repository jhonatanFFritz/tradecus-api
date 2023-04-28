import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, extname, join } from "path";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const TIPO = ["image/png", "image/jpg", "image/jpeg"];

export const multerUpload = multer({ 

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, join(CURRENT_DIR, "../../public/uploads"));
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