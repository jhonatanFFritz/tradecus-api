import fs from "fs";
import { pool } from "../../dbconection/db.js";

export const removeTourImg = async (req, res) => {
  const { id, imgId } = req.params;
  
  try {
    const [rows] = await pool.query(
      `SELECT * FROM imagenes WHERE tour_id_tour = ? AND id_img = ?`,
      [id, imgId]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ msg: "No se encontró la imagen especificada" });
    }

    // Eliminar la imagen de la base de datos
    await pool.query(`DELETE FROM imagenes WHERE tour_id_tour = ? AND id_img = ?`, [
      id,
      imgId,
    ]);

    // Eliminar la imagen del directorio uploads
    const filePath = `${process.cwd()}/public/uploads/${rows[0].nombre_img}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(`Error al eliminar archivo ${filePath}`, err);
      } else {
        console.log(`Archivo ${filePath} eliminado`);
      }
    });

    res.json({ msg: "Imagen eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al eliminar la imagen" });
  }
};
