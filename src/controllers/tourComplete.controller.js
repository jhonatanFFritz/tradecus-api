import { pool } from "../db.js";
import multer from "multer";

//El siguinete código crea una transaccion para crear un tour y sus imagenes
export const createTour = async (req, res) => {
  const {
    nombre_tour,
    precio_tour,
    duracion_tour,
    descripcion_tour
    
  } = req.body;
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const [rows] = await connection.query(
      "INSERT INTO tour(nombre_tour, precio_tour, duracion_tour, descripcion_tour) VALUES (?, ?, ?, ?)",
      [
        nombre_tour,
        precio_tour,
        duracion_tour,
        descripcion_tour
      ]
    );
    const id_tour = rows.insertId;
    const images = req.files;
    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        const { filename } = images[i];
        await connection.query(
          "INSERT INTO imagen_tour(id_tour, nombre_imagen) VALUES (?, ?)",
          [id_tour, filename]
        );
      }
    }
    await connection.commit();
    res.send({ id: id_tour });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ msg: "Error al crear el tour" });
  } finally {
    connection.release();
  }
}