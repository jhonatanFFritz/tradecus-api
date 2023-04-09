import {pool} from '../db.js';

//El siguiente código obtine todos los serivicios adicionales

export const getAdditionalServices = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM servicio_adicional");
        res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al obtener los servicios adicionales"});
    }
}
//El siguiente código obtine un servicio adicional por id
export const getAdditionalService = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM servicio_adicional WHERE id_serv_adicional = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({msg: "Servicio adicional no encontrado"});
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({msg: "Error al obtener el servicio adicional"});
    }
}

//El siguiente código crea un servicio adicional
export const createAdditionalService = async (req, res) => {
    const {nombre, descripcion, precio} = req.body;
    try {
        //rows es un arreglo de objetos que contiene los datos de la consulta sql 
        const [rows] = await pool.query("INSERT INTO servicio_adicional(nombre, descripcion, precio) VALUES (?, ?, ?)", [nombre, descripcion, precio]);
        res.send({
            id: rows.insertId,
            nombre,
            descripcion,
            precio
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al crear el servicio adicional"});
    }
}

//El siguiente código actualiza un servicio adicional
export const updateAdditionalService = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, precio} = req.body;
    //req.body es el objeto que se envia en el body de la peticion
    try {
        const [result] = await pool.query("UPDATE servicio_adicional SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), precio = IFNULL(?, precio) WHERE id_serv_adicional = ?", [nombre, descripcion, precio, id]);
        if (!result.affectedRows) return res.status(404).json({msg: "No se encontró ningun servicio adicional"});
        const [rows] = await pool.query("SELECT * FROM servicio_adicional WHERE id_serv_adicional = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al actualizar el servicio adicional"});
    }
}

//El siguiente código elimina un servicio adicional
export const deleteAdditionalService = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM servicio_adicional WHERE id_serv_adicional = ?", [req.params.id]);
        if (!result.affectedRows) return res.status(404).json({msg: "No se encontró ningun servicio adicional"});
        res.json({msg: "Servicio adicional eliminado"});
    } catch (error) {
        return res.status(500).json({msg: "Error al eliminar el servicio adicional"});
    }
}