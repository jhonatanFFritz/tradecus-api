import { pool } from "../../dbconection/db.js";
// Código que actualiza un tipo de documento
export const updateOneDocType = async (req, res) => {
  const { id } = req.params;
  const { nombre_doc } = req.body;
  //req.body es el objeto que se envia en el body de la peticion
  try {
    const [result] = await pool.query(
      "UPDATE tipo_doc SET nombre_doc = IFNULL(?, nombre_doc) WHERE id_tipo_doc = ?",
      [nombre_doc, id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun tipo de documento" });
    const [rows] = await pool.query(
      "SELECT * FROM tipo_doc WHERE id_tipo_doc = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al actualizar el tipo de documento" });
  }
};
