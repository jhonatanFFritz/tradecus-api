//importamos el pool de conexiones
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de eliminar un rol
export const deleteOneRol = async (req, res) => {
  //obtenemos el id del rol desde los parametros de la ruta
  const { id } = req.params;

  try {
    //rows es un arreglo de objetos que contiene los datos de la consulta sql
    const [rows] = await pool.query("DELETE FROM rol WHERE id_rol = ?", [id]);
    res.send({
      id,
      message: "Rol eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al eliminar el rol" });
  }
};
