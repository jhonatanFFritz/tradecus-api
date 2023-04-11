import { pool } from "../../dbconection/db.js";
// Código que crea un tipo de transporte
export const createConveyance = async (req, res) => {
  const { nombre_transporte, descripcion_transporte } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO medio_transporte(nombre_transporte, descripcion_transporte) VALUES (?, ?)",
      [nombre_transporte, descripcion_transporte]
    );
    res.send({
      id: rows.insertId,
      nombre_transporte,
      descripcion_transporte,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al crear el tipo de transporte" });
  }
};
