import { pool } from "../../dbconection/db.js";

// Código que elimina un tipo de transporte
export const deleteOneConveyance = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM medio_transporte WHERE id_transporte = ?",
      [id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se ha encontrado el tipo de transporte" });
    res.json({ msg: "Tipo de transporte eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el tipo de transporte" });
  }
};
