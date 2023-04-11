import {pool} from "../../dbconection/db.js";
// Código que obtiene un tipo de documento por id
export const getOneDocType = async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM tipo_doc WHERE id_tipo_doc = ?",
        [req.params.id]
      );
      if (!rows.length)
        return res.status(404).json({ msg: "Tipo de documento no encontrado" });
      res.json(rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Error al obtener el tipo de documento" });
    }
  };