//importamos el pool de conexiones
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de agregar un nuevo rol
export const addNewRol = async (req, res) => {
    //obtenemos el nombre del rol desde el body
    const { nombre_rol } = req.body;
    
    try {
        //rows es un arreglo de objetos que contiene los datos de la consulta sql
        const [rows] = await pool.query(
          "INSERT INTO rol(nombre_rol) VALUES (?)",
          [nombre_rol]
        );
        res.send({
          id: rows.insertId,
          nombre_rol
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al crear el rol" });
      }
}