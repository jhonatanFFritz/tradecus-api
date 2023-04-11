import { pool } from "../../dbconection/db.js";
// Código que crea un tipo de documento
export const addNewDocType = async (req, res) => {
  const { nombre_doc } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO tipo_doc(nombre_doc) VALUES (?)",
      [nombre_doc]
    );
    res.send({
      id: rows.insertId,
      nombre_doc,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error al crear el tipo de documento" });
  }
};
