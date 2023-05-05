//importamos el pool de conexiones
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de actualizar un rol
export const updateRol = async (req, res) => {
  //obtenemos el id del rol desde los parametros de la ruta
  const { id } = req.params;
  //obtenemos el nombre del rol desde el body
  const { nombre_rol } = req.body;

  try {
    //rows es un arreglo de objetos que contiene los datos de la consulta sql
    const [rows] = await pool.query(
      "UPDATE rol SET nombre_rol = ? WHERE id_rol = ?",
      [nombre_rol, id]
    );
    res.send({
      id,
      nombre_rol,
        message: "Rol actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al actualizar el rol" });
  }
};
