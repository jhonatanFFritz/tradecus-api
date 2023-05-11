//importamos el pool de conexiones
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de obtener todos los detalles de un tour
export const getAllDetails = async (req, res) => {
  try {
    //hacemos la consulta a la base de datos
    const [rows] = await pool.query(`SELECT * FROM detalle_tour`);
    //si no hay registros
    if (!rows.length) return res.status(400).json({ msg: "No hay detalles" });
    //si hay registros
    res.json(rows);
  } catch (error) {
    //si hay un error
    return res.status(500).json({ msg: "Error al obtener los detalles" });
  }
};
