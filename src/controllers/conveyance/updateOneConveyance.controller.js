import { pool } from "../../dbconection/db.js";
// Código que actualiza un tipo de transporte
export const updateOneConveyance = async (req, res) => {
  const { id } = req.params;
  const { nombre_transporte, descripcion_transporte } = req.body;
  //req.body es el objeto que se envia en el body de la peticion
  try {
    const [result] = await pool.query(
      "UPDATE medio_transporte SET nombre_transporte = IFNULL(?, nombre_transporte), descripcion_transporte = IFNULL(?, descripcion_transporte) WHERE id_transporte = ?",
      [nombre_transporte, descripcion_transporte, id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se ha encontrado el tipo de transporte" });
    res.json({ msg: "Tipo de transporte actualizado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al actualizar el tipo de transporte" });
  }
};
