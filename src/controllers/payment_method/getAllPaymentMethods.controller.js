import { pool } from "../../dbconection/db.js";
//El siguiente código obtiene todos los metodos de pago

export const getAllPaymentMethods = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM metodo_pago");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener los metodos de pago" });
  }
};
