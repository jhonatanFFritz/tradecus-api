import { pool } from "../../dbconection/db.js";
// Código que obtiene un tipo de transporte por id
export const getConveyance = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM medio_transporte WHERE id_transporte = ?",
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ msg: "Tipo de transporte no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener el tipo de transporte" });
  }
};
