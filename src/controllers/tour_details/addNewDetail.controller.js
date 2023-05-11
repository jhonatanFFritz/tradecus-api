//importamos el pool de la base de datos
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de agregar un nuevo detalle de tour
export const addNewDetail = async (req, res) => {
  try {
    //obtenemos los datos del body
    const {
      atractivo_tour,
      tipo_transporte,
      duracion_viaje,
      distancia_recorrido,
      id_transporte,
      id_tour
    } = req.body;
    //hacemos la consulta a la base de datos
    const [rows] = await pool.query(
      `INSERT INTO detalle_tour (atractivo_tour, tipo_transporte, duracion_viaje, distancia_recorrido, id_tour, id_transporte) VALUES (?, ?, ?, ?, ?, ?)`,
      [atractivo_tour, tipo_transporte, duracion_viaje, distancia_recorrido, id_tour, id_transporte]
    );
    //si no se inserto ningun registro
    if (!rows.affectedRows)
      return res.status(400).json({ msg: "No se pudo agregar el detalle" });
    //si se inserto el registro
    // res.json({ msg: "Detalle agregado correctamente" })
    res.send({
        id: rows.insertId,
        atractivo_tour,
        tipo_transporte,
        duracion_viaje,
        distancia_recorrido,
        id_tour,
        id_transporte
    });
  } catch (error) {
    //si hay un error
    return res.status(500).json({ msg: "Error al agregar el detalle" });
  }
};
