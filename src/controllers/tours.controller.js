import { pool } from "../db.js";

//El siguiente código obtine todos los tours
export const getTours = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tour");
  res.json(rows);
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener los tours" });
  }
};

//El siguiente código obtine un tour por id
export const getTour = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tour WHERE id_tour = ?", [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ msg: "Tour not found" });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener el tour" });
  }
};

//El siguiente código crea un tour
export const createTour = async (req, res) => {
  const { nombre, precio, duracion } = req.body;
  try {
  const [rows] = await pool.query(
    "INSERT INTO tour(nombre, precio, duracion) VALUES (?, ?, ?)",
    [nombre, precio, duracion]
  );
  res.send({
    id: rows.insertId,
    nombre,
    precio,
    duracion,
  });
  } catch (error) {
    return res.status(500).json({ msg: "Error al crear el tour" });
  }
};

//El siguiente código actualiza un tour
export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, duracion } = req.body;
  //req.body es el objeto que se envia en el body de la peticion
  try {
    

  const [result] = await pool.query(
    "UPDATE tour SET nombre = IFNULL(?, nombre), precio = IFNULL(?, precio), duracion = IFNULL(?, duracion) WHERE id_tour = ?",
    [nombre, precio, duracion, id]
  );
  if (!result.affectedRows)
    return res.status(404).json({ msg: "No se encontró ningun tour" });
  const [rows] = await pool.query("SELECT * FROM tour WHERE id_tour = ?", [id]);
  res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ msg: "Error al actualizar el tour" });
  }
};

//El siguiente código elimina un tour
export const deleteTour = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tour WHERE id_tour = ?", [
      req.params.id,
      //req.params.id es el id que se pasa por la url
    ]);
    if (!result.affectedRows)
      return res.status(404).json({ msg: "No se encontró ningun tour" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: "Error al eliminar el tour" });
  }
};
