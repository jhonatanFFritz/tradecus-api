import { pool } from "../../dbconection/db.js";
//El siguiente código obtine un metodo de pago por id
export const getOnePaymentMethod = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM metodo_pago WHERE id_metodo_pago = ?",
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ msg: "Metodo de pago no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener el metodo de pago" });
  }
};
