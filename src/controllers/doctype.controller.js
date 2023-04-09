import { pool } from "../db.js";

// Código que obtiene todos los tipos de documentos
export const getDocTypes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tipo_doc");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener los tipos de documentos" });
  }
};

// Código que obtiene un tipo de documento por id
export const getDocType = async (req, res) => {
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

// Código que crea un tipo de documento
export const createDocType = async (req, res) => {
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

// Código que actualiza un tipo de documento
export const updateDocType = async (req, res) => {
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

// Código que elimina un tipo de documento
export const deleteDocType = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM tipo_doc WHERE id_tipo_doc = ?",
      [id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se encontró ningun tipo de documento" });
    res.json({ msg: "Tipo de documento eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el tipo de documento" });
  }
};
