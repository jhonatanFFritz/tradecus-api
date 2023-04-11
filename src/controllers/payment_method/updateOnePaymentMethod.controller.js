import { pool } from "../../dbconection/db.js";
//El siguiente código actualiza un metodo de pago
export const updateOnePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const { nombre_pago, descripcion_pago } = req.body;
  //req.body es el objeto que se envia en el body de la peticion
  try {
    const [result] = await pool.query(
      "UPDATE metodo_pago SET nombre_pago = IFNULL(?, nombre_pago), descripcion_pago = IFNULL(?, descripcion_pago) WHERE id_metodo_pago = ?",
      [nombre_pago, descripcion_pago, id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun metodo de pago" });
    const [rows] = await pool.query(
      "SELECT * FROM metodo_pago WHERE id_metodo_pago = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error al actualizar el metodo de pago" });
  }
};
