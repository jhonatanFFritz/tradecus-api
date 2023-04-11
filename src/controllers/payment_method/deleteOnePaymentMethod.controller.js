import { pool } from "../../dbconection/db.js";

//El siguiente código elimina un metodo de pago
export const deleteOnePaymentMethod = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM metodo_pago WHERE id_metodo_pago = ?",
      [req.params.id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun metodo de pago" });
    res.json({ msg: "Metodo de pago eliminado" });
  } catch (error) {
    return res.status(500).json({ msg: "Error al eliminar el metodo de pago" });
  }
};
