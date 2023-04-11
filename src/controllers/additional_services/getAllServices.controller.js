import {pool} from '../../dbconection/db.js';

// el siguiente código obtiene todos los servicios adicionales

export const getAdditionalServices = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM servicio_adicional");
        res.json(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error al obtener los servicios adicionales"});
    }
}
