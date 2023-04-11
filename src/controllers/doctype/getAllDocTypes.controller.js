import { pool } from "../../dbconection/db.js";
// Código que obtiene todos los tipos de documentos
export const getAllDocTypes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tipo_doc");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener los tipos de documentos" });
  }
};
