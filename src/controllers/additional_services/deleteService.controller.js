import { pool } from "../../dbconection/db.js";

//El siguiente código elimina un servicio adicional
export const deleteAdditionalService = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM servicio_adicional WHERE id_serv_adicional = ?",
      [req.params.id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun servicio adicional" });
    res.json({ msg: "Servicio adicional eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el servicio adicional" });
  }
};
