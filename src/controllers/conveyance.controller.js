import { pool } from "../db.js";

// Código que obtiene todos los tipos de trasportes
export const getConveyances = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM medio_transporte");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener los tipos de trasportes" });
  }
};

// Código que obtiene un tipo de transporte por id
export const getConveyance = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM medio_transporte WHERE id_transporte = ?",
      [req.params.id]
    );
    if (!rows.length)
      return res.status(404).json({ msg: "Tipo de transporte no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener el tipo de transporte" });
  }
};

// Código que crea un tipo de transporte
export const createConveyance = async (req, res) => {
  const { nombre_transporte, descripcion_transporte } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO medio_transporte(nombre_transporte, descripcion_transporte) VALUES (?, ?)",
      [nombre_transporte, descripcion_transporte]
    );
    res.send({
      id: rows.insertId,
      nombre_transporte,
      descripcion_transporte,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al crear el tipo de transporte" });
  }
};

// Código que actualiza un tipo de transporte
export const updateConveyance = async (req, res) => {    
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

// Código que elimina un tipo de transporte
export const deleteConveyance = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM medio_transporte WHERE id_transporte = ?",
      [id]
    );
    if (!result.affectedRows)
      return res
        .status(404)
        .json({ msg: "No se ha encontrado el tipo de transporte" });
    res.json({ msg: "Tipo de transporte eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el tipo de transporte" });
  }
};

