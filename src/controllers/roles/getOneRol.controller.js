//importamos el pool de conexiones
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de obtener un rol por su id
export const getOneRol = async (req, res) => {
  //obtenemos el id del rol desde los parametros de la ruta
  const { id } = req.params;

  try {
    //rows es un arreglo de objetos que contiene los datos de la consulta sql
    const [rows] = await pool.query("SELECT * FROM rol WHERE id_rol = ?", [id]);
    res.send(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al obtener el rol" });
  }
};
