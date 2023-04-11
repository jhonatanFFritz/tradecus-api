import { pool } from "../../dbconection/db.js";

//El siguiente código actualiza un servicio adicional
export const updateAdditionalService = async (req, res) => {
  const { id } = req.params;
  const { nombre_serv, descripcion_serv, precio_serv } = req.body;
  //req.body es el objeto que se envia en el body de la peticion
  try {
    const [result] = await pool.query(
      "UPDATE servicio_adicional SET nombre_serv = IFNULL(?, nombre_serv), descripcion_serv = IFNULL(?, descripcion_serv), precio_serv = IFNULL(?, precio_serv) WHERE id_serv_adicional = ?",
      [nombre_serv, descripcion_serv, precio_serv, id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun servicio adicional" });
    const [rows] = await pool.query(
      "SELECT * FROM servicio_adicional WHERE id_serv_adicional = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error al actualizar el servicio adicional" });
  }
};
