import { pool } from "../../dbconection/db.js";

// Código que elimina un tipo de documento
export const deleteOneDocType = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM tipo_doc WHERE id_tipo_doc = ?",
      [id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun tipo de documento" });
    res.json({ msg: "Tipo de documento eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el tipo de documento" });
  }
};
