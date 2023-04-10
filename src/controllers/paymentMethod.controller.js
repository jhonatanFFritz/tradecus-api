import {pool} from '../db.js';

//El siguiente código obtine todos los metodos de pago

export const getPaymentMethods = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM metodo_pago");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({msg: "Error al obtener los metodos de pago"});
    }
}

//El siguiente código obtine un metodo de pago por id
export const getPaymentMethod = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM metodo_pago WHERE id_metodo_pago = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({msg: "Metodo de pago no encontrado"});
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({msg: "Error al obtener el metodo de pago"});
    }
}

//El siguiente código crea un metodo de pago
export const createPaymentMethod = async (req, res) => {
    const {nombre_pago, descripcion_pago} = req.body;
    try {
        //rows es un arreglo de objetos que contiene los datos de la consulta sql 
        const [rows] = await pool.query("INSERT INTO metodo_pago(nombre_pago, descripcion_pago) VALUES (?, ?)", [nombre_pago, descripcion_pago]);
        res.send({
            id: rows.insertId,
            nombre_pago,
            descripcion_pago
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al crear el metodo de pago"});
    }
}

//El siguiente código actualiza un metodo de pago   
export const updatePaymentMethod = async (req, res) => {
    const {id} = req.params;
    const {nombre_pago, descripcion_pago} = req.body;
    //req.body es el objeto que se envia en el body de la peticion
    try {
        const [result] = await pool.query("UPDATE metodo_pago SET nombre_pago = IFNULL(?, nombre_pago), descripcion_pago = IFNULL(?, descripcion_pago) WHERE id_metodo_pago = ?", [nombre_pago, descripcion_pago, id]);
        if (!result.affectedRows) return res.status(404).json({msg: "No se encontró ningun metodo de pago"});
        const [rows] = await pool.query("SELECT * FROM metodo_pago WHERE id_metodo_pago = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al actualizar el metodo de pago"});
    }
}

//El siguiente código elimina un metodo de pago
export const deletePaymentMethod = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM metodo_pago WHERE id_metodo_pago = ?", [req.params.id]);
        if (!result.affectedRows) return res.status(404).json({msg: "No se encontró ningun metodo de pago"});
        res.json({msg: "Metodo de pago eliminado"});
    } catch (error) {
        return res.status(500).json({msg: "Error al eliminar el metodo de pago"});
    }
}