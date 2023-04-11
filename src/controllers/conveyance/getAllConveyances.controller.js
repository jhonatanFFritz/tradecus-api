import { pool } from "../../dbconection/db.js";
// Código que obtiene todos los tipos de trasportes
export const getAllConveyances = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medio_transporte");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener los tipos de trasportes" });
  }
};
