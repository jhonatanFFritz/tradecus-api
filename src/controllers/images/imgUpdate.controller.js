import { pool } from "../../dbconection/db.js";
import fs from "fs/promises";

export const updateImg = async (req, res) => {
  const { id } = req.params;
  const { filename, path } = req.file;
  const { tour_id_tour } = req.body;
  try {
    // Consulta SQL para obtener la información de la imagen que se va a reemplazar.
    const [rows] = await pool.query(
      "SELECT * FROM imagenes WHERE id_img = ?",
      [id]
    );
    // Si la imagen no existe, se envía un error.
    if (!rows.length)
      return res.status(404).json({ msg: "No se encontró la imagen" });

    // Eliminar la imagen anterior del servidor.
    await fs.unlink(rows[0].url_img);

    // Consulta SQL para eliminar la imagen anterior del tour.
    await pool.query("DELETE FROM imagenes WHERE id_img = ?", [id]);

    // Consulta SQL para insertar la nueva imagen en la tabla de imágenes del tour.
    const [result] = await pool.query(
      "INSERT INTO imagenes(nombre_img, url_img, tour_id_tour) VALUES (?, ?, ?)",
      [filename, path, tour_id_tour]
    );
    const newImgId = result.insertId;

    res.send({
      id: newImgId,
      filename,
      path,
      tour_id_tour,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar la imagen" });
  }
};
