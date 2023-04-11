import {pool} from '../../dbconection/db.js';
//El siguiente código crea un servicio adicional
export const addOneAdditionalService = async (req, res) => {
    const {nombre_serv, descripcion_serv, precio_serv} = req.body;
    try {
        //rows es un arreglo de objetos que contiene los datos de la consulta sql 
        const [rows] = await pool.query("INSERT INTO servicio_adicional(nombre_serv, descripcion_serv, precio_serv) VALUES (?, ?, ?)", [nombre_serv, descripcion_serv, precio_serv]);
        res.send({
            id: rows.insertId,
            nombre_serv,
            descripcion_serv,
            precio_serv
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al crear el servicio adicional"});
    }
}