//importamos el pool de conexiones
import { pool } from "../../dbconection/db.js";

//exportamos la funcion que se encargara de obtener todos los roles
export const getAllRoles = async (req, res) => {
    try {
        //rows es un arreglo de objetos que contiene los datos de la consulta sql
        const [rows] = await pool.query("SELECT * FROM rol");
        res.send(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al obtener los roles" });
    }
};
